import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../../services/classe.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { AnneeAcademique } from '../../models/annee-academique';
import { AlertService } from '../../services/alert.service';
import { NiveauService } from '../../services/niveau.service';
import { SalleService } from '../../services/salle.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {
  currentYear = '';
  classes: any[] = [];
  niveaux: any[] = [];
  salles: any[] = [];
  annees: any[] = [];

  searchQuery = '';
  selectedNiveau = '';

  isModalOpen = false;
  isEditing = false;
  currentClasseId: string | null = null;

  classeForm!: FormGroup;

  constructor(
    private classeService: ClasseService,
    private anneeService: AnneeAcademiqueService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private niveauService: NiveauService,
    private salleService: SalleService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.handleQuickAction();
  }

  initForm() {
    this.classeForm = this.fb.group({
      nom: ['', Validators.required],
      niveauId: ['', Validators.required],
      anneeAcademiqueId: [''],
      effectifMax: [0, Validators.required],
      salleId: ['']
    });
  }

  loadData() {
    this.anneeService.getCourante().subscribe((a: AnneeAcademique) => {
      this.currentYear = a.libelle ?? 'N/A';
    });

    this.anneeService.listAnnees(0, 100).subscribe((response: any) => {
      this.annees = Array.isArray(response) ? response : (response?.content ?? []);
    });

    this.niveauService.list().subscribe((response: any) => {
      this.niveaux = Array.isArray(response) ? response : (response?.content ?? []);
    });

    this.salleService.list().subscribe((response: any) => {
      this.salles = Array.isArray(response) ? response : (response?.content ?? []);
    });

    this.classeService.listClasses().subscribe((res) => {
      this.classes = res.content ?? [];
    });
  }

  get filteredClasses() {
    return this.classes.filter(c => {
      const niveauLabel = String(c.niveau ?? '').toLowerCase();
      const matchSearch =
        String(c.nom ?? '').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        niveauLabel.includes(this.searchQuery.toLowerCase());

      const matchNiveau =
        !this.selectedNiveau || String(c.niveauId ?? '') === this.selectedNiveau;

      return matchSearch && matchNiveau;
    });
  }

  openModal(classe?: any) {
    this.isModalOpen = true;
    this.isEditing = !!classe;

    if (classe) {
      this.currentClasseId = classe.id;
      this.classeForm.patchValue({
        nom: classe.nom ?? '',
        niveauId: classe.niveauId ?? '',
        anneeAcademiqueId: classe.anneeAcademiqueId ?? '',
        effectifMax: classe.effectifMax ?? 0,
        salleId: classe.salleId ?? ''
      });
      return;
    }

    this.currentClasseId = null;
    this.classeForm.reset({
      nom: '',
      niveauId: '',
      anneeAcademiqueId: '',
      effectifMax: 0,
      salleId: ''
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.classeForm.reset();
    this.isEditing = false;
    this.currentClasseId = null;
  }

  onSubmit() {
    if (this.classeForm.invalid) {
      this.classeForm.markAllAsTouched();
      this.alertService.warning('Champs requis', 'Veuillez compléter les champs obligatoires.');
      return;
    }

    const data = { ...this.classeForm.value };

    if (this.isEditing && this.currentClasseId) {
      this.classeService.updateClasse(this.currentClasseId, data).subscribe({
        next: () => {
          this.alertService.success('Succès', 'Classe modifiée.');
          this.closeModal();
          this.loadData();
        },
        error: () => {
          this.alertService.error('Modification impossible', 'La classe n’a pas pu être modifiée.');
        }
      });
      return;
    }

    this.classeService.createClasse(data).subscribe({
      next: () => {
        this.alertService.success('Succès', 'Classe créée.');
        this.closeModal();
        this.loadData();
      },
      error: () => {
        this.alertService.error('Création impossible', 'La classe n’a pas pu être créée.');
      }
    });
  }

  private handleQuickAction(): void {
    if (this.route.snapshot.queryParamMap.get('action') === 'create') {
      this.openModal();
      this.clearQuickActionParam();
    }
  }

  private clearQuickActionParam(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
