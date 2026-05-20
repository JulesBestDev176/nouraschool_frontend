import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { ClasseService } from '../../services/classe.service';
import { AlertService } from '../../services/alert.service';
import { MatiereService } from '../../services/matiere.service';
import { EnseignantService } from '../../services/enseignant.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  classes: any[] = [];
  matieres: any[] = [];
  enseignants: any[] = [];
  annees: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  isModalOpen = false;
  isEditing = false;
  editingId: string | null = null;

  selectedClasseId = '';

  form = {
    matiereId: '',
    classeId: '',
    enseignantId: '',
    anneeAcademiqueId: '',
    volumeHoraireHebdo: '',
    coefficient: ''
  };

  constructor(
    private readonly coursService: CoursService,
    private readonly classeService: ClasseService,
    private readonly alertService: AlertService,
    private readonly matiereService: MatiereService,
    private readonly enseignantService: EnseignantService,
    private readonly anneeService: AnneeAcademiqueService
  ) {}

  ngOnInit(): void {
    this.loadLookups();
    this.load();
  }

  load(): void {
    this.loading = true;
    this.coursService.list(this.selectedClasseId || undefined).subscribe({
      next: (data) => {
        this.cours = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les cours.';
        this.loading = false;
      }
    });
  }

  loadLookups(): void {
    this.classeService.listClasses(0, 200).subscribe({
      next: (data) => {
        this.classes = data.content ?? [];
      }
    });

    this.matiereService.listMatieres(0, 200).subscribe({
      next: (data: any) => {
        this.matieres = data.content ?? [];
      }
    });

    this.enseignantService.listEnseignants(0, 200).subscribe({
      next: (data) => {
        this.enseignants = data.content ?? [];
      }
    });

    this.anneeService.listAnnees(0, 100).subscribe({
      next: (data: any) => {
        this.annees = Array.isArray(data) ? data : (data?.content ?? []);
      }
    });
  }

  filterByClasse(): void {
    this.load();
  }

  openModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.form = {
      matiereId: '',
      classeId: '',
      enseignantId: '',
      anneeAcademiqueId: '',
      volumeHoraireHebdo: '',
      coefficient: ''
    };
    this.isModalOpen = true;
  }

  openEditModal(c: any): void {
    this.isEditing = true;
    this.editingId = c.id;
    this.form = {
      matiereId: c.matiereId ?? c.matiere?.id ?? '',
      classeId: c.classeId ?? '',
      enseignantId: c.enseignantId ?? '',
      anneeAcademiqueId: c.anneeAcademiqueId ?? '',
      volumeHoraireHebdo: c.volumeHoraireHebdo ?? '',
      coefficient: c.coefficient ?? ''
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  save(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.form.matiereId || !this.form.classeId || !this.form.enseignantId) {
      this.errorMessage = 'Matiere, classe et enseignant sont obligatoires.';
      this.alertService.warning('Champs requis', this.errorMessage);
      return;
    }

    const dto: Record<string, unknown> = {
      ...this.form,
      volumeHoraireHebdo: this.form.volumeHoraireHebdo ? Number(this.form.volumeHoraireHebdo) : undefined,
      coefficient: this.form.coefficient ? Number(this.form.coefficient) : undefined
    };

    if (this.isEditing && this.editingId) {
      this.coursService.update(this.editingId, dto).subscribe({
        next: () => {
          this.successMessage = 'Cours modifié.';
          this.alertService.success('Succès', this.successMessage);
          this.closeModal();
          this.load();
        },
        error: () => {
          this.errorMessage = 'Modification impossible.';
          this.alertService.error('Modification impossible', this.errorMessage);
        }
      });
      return;
    }

    this.coursService.create(dto).subscribe({
      next: () => {
        this.successMessage = 'Cours créé.';
        this.alertService.success('Succès', this.successMessage);
        this.closeModal();
        this.load();
      },
      error: () => {
        this.errorMessage = 'Création impossible.';
        this.alertService.error('Création impossible', this.errorMessage);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.alertService.confirmDelete('ce cours');
    if (!result.isConfirmed) return;
    this.coursService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Cours supprimé.';
        this.alertService.success('Succès', this.successMessage);
        this.load();
      },
      error: () => {
        this.errorMessage = 'Suppression impossible.';
        this.alertService.error('Suppression impossible', this.errorMessage);
      }
    });
  }

  getClasseNom(classeId: string): string {
    const c = this.classes.find((x: any) => x.id === classeId);
    return c ? c.nom : classeId;
  }

  getMatiereNom(cours: any): string {
    return cours.matiere?.libelle
      ?? this.matieres.find((item: any) => item.id === cours.matiereId)?.libelle
      ?? cours.matiereId
      ?? '-';
  }

  getEnseignantNom(cours: any): string {
    const enseignant = this.enseignants.find((item: any) => item.id === cours.enseignantId);
    if (cours.enseignant?.firstName || cours.enseignant?.lastName) {
      return `${cours.enseignant.firstName ?? ''} ${cours.enseignant.lastName ?? ''}`.trim();
    }
    if (enseignant) {
      return `${enseignant.firstName ?? enseignant.prenom ?? ''} ${enseignant.lastName ?? enseignant.nom ?? ''}`.trim();
    }
    return cours.enseignantId ?? '-';
  }
}
