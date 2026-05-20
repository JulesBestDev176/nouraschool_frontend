import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../../services/inscription.service';
import { Inscription } from '../../models/inscription';
import { EleveService } from '../../services/eleve.service';
import { ClasseService } from '../../services/classe.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {
  inscriptions: Inscription[] = [];
  filteredInscriptions: Inscription[] = [];
  eleves: Array<{ id: string; label: string }> = [];
  classes: Array<{ id: string; label: string }> = [];
  annees: Array<{ id: string; label: string }> = [];
  searchQuery = '';

  inscriptionForm!: FormGroup;
  transferForm!: FormGroup;
  isCreateModalOpen = false;
  isTransferModalOpen = false;
  selectedInscriptionId: string | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly inscriptionService: InscriptionService,
    private readonly eleveService: EleveService,
    private readonly classeService: ClasseService,
    private readonly anneeService: AnneeAcademiqueService,
    private readonly fb: FormBuilder,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadLookups();
    this.loadInscriptions();
  }

  private initForms(): void {
    this.inscriptionForm = this.fb.group({
      eleveId: ['', Validators.required],
      classeId: ['', Validators.required],
      anneeAcademiqueId: ['', Validators.required]
    });
    this.transferForm = this.fb.group({
      classeId: ['', Validators.required]
    });
  }

  private loadLookups(): void {
    this.eleveService.listEleves(0, 200).subscribe((response) => {
      this.eleves = (response.content ?? []).map((e: any) => ({
        id: String(e.id),
        label: `${e.prenom ?? ''} ${e.nom ?? ''}`.trim() || String(e.id)
      }));
    });

    this.classeService.listClasses(0, 200).subscribe((response) => {
      this.classes = (response.content ?? []).map((c: any) => ({
        id: String(c.id),
        label: c.nom ?? String(c.id)
      }));
    });

    this.anneeService.listAnnees(0, 100).subscribe((response) => {
      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.['content'])
          ? (response['content'] as any[])
          : [];
      this.annees = list.map((a: any) => ({
        id: String(a.id),
        label: a.libelle ?? String(a.id)
      }));
    });
  }

  loadInscriptions(): void {
    this.inscriptionService.listInscriptions().subscribe({
      next: (response) => {
        this.inscriptions = response.content ?? [];
        this.applyFilter();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les inscriptions.';
      }
    });
  }

  applyFilter(): void {
    const search = this.searchQuery.trim().toLowerCase();
    if (!search) {
      this.filteredInscriptions = [...this.inscriptions];
      return;
    }
    this.filteredInscriptions = this.inscriptions.filter((i) =>
      String(i.numeroInscription ?? '').toLowerCase().includes(search) ||
      String(i.statut ?? '').toLowerCase().includes(search) ||
      String(i.id).toLowerCase().includes(search)
    );
  }

  openCreateModal(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.inscriptionForm.reset();
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  onCreate(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
      this.alertService.warning('Champs requis', 'Veuillez compléter les champs obligatoires.');
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.inscriptionService.createInscription(this.inscriptionForm.value).subscribe({
      next: () => {
        this.successMessage = 'Inscription créée avec succès.';
        this.alertService.success('Succès', this.successMessage);
        this.closeCreateModal();
        this.loadInscriptions();
      },
      error: () => {
        this.errorMessage = 'Échec de création de l’inscription.';
        this.alertService.error('Création impossible', this.errorMessage);
      }
    });
  }

  openTransferModal(inscription: Inscription): void {
    this.selectedInscriptionId = inscription.id;
    this.transferForm.reset();
    this.isTransferModalOpen = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeTransferModal(): void {
    this.isTransferModalOpen = false;
    this.selectedInscriptionId = null;
  }

  onTransfer(): void {
    if (!this.selectedInscriptionId || this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      this.alertService.warning('Champs requis', 'Veuillez choisir une classe.');
      return;
    }
    this.inscriptionService.transfererInscription(this.selectedInscriptionId, this.transferForm.value.classeId).subscribe({
      next: () => {
        this.successMessage = 'Inscription transférée.';
        this.alertService.success('Succès', this.successMessage);
        this.closeTransferModal();
        this.loadInscriptions();
      },
      error: () => {
        this.errorMessage = 'Échec du transfert de l’inscription.';
        this.alertService.error('Transfert impossible', this.errorMessage);
      }
    });
  }

  async onDelete(inscription: Inscription): Promise<void> {
    const result = await this.alertService.confirmDelete('cette inscription');
    if (!result.isConfirmed) {
      return;
    }

    this.inscriptionService.deleteInscription(inscription.id).subscribe({
      next: () => {
        this.successMessage = 'Inscription supprimée.';
        this.alertService.success('Succès', this.successMessage);
        this.loadInscriptions();
      },
      error: () => {
        this.errorMessage = 'Échec de suppression de l’inscription.';
        this.alertService.error('Suppression impossible', this.errorMessage);
      }
    });
  }

  getEleveLabel(id: string): string {
    return this.eleves.find((e) => e.id === id)?.label ?? id;
  }

  getClasseLabel(id: string): string {
    return this.classes.find((c) => c.id === id)?.label ?? id;
  }

  getAnneeLabel(id: string): string {
    return this.annees.find((a) => a.id === id)?.label ?? id;
  }
}
