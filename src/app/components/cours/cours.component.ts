import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent implements OnInit {
  cours: any[] = [];
  classes: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  isModalOpen = false;
  isEditing = false;
  editingId: string | null = null;

  selectedClasseId = '';

  form = {
    titre: '',
    description: '',
    classeId: '',
    enseignantId: '',
    dateDebut: '',
    dateFin: '',
    heures: ''
  };

  constructor(
    private readonly coursService: CoursService,
    private readonly classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    this.load();
  }

  load(): void {
    this.loading = true;
    this.coursService.list(this.selectedClasseId || undefined).subscribe({
      next: (data) => {
        this.cours = Array.isArray(data) ? data : (data as any)?.content ?? [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les cours.';
        this.loading = false;
      }
    });
  }

  loadClasses(): void {
    this.classeService.listClasses().subscribe({
      next: (data) => {
        this.classes = (data as any)?.content ?? data ?? [];
      },
      error: () => {}
    });
  }

  filterByClasse(): void {
    this.load();
  }

  openModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.form = { titre: '', description: '', classeId: '', enseignantId: '', dateDebut: '', dateFin: '', heures: '' };
    this.isModalOpen = true;
  }

  openEditModal(c: any): void {
    this.isEditing = true;
    this.editingId = c.id;
    this.form = {
      titre: c.titre ?? c.nom ?? '',
      description: c.description ?? '',
      classeId: c.classeId ?? '',
      enseignantId: c.enseignantId ?? '',
      dateDebut: c.dateDebut ?? '',
      dateFin: c.dateFin ?? '',
      heures: c.heures ?? ''
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  save(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.form.titre || !this.form.classeId) {
      this.errorMessage = 'Titre et classe sont obligatoires.';
      return;
    }

    const dto: Record<string, unknown> = { ...this.form };

    if (this.isEditing && this.editingId) {
      this.coursService.update(this.editingId, dto).subscribe({
        next: () => { this.successMessage = 'Cours modifié.'; this.closeModal(); this.load(); },
        error: () => { this.errorMessage = 'Modification impossible.'; }
      });
    } else {
      this.coursService.create(dto).subscribe({
        next: () => { this.successMessage = 'Cours créé.'; this.closeModal(); this.load(); },
        error: () => { this.errorMessage = 'Création impossible.'; }
      });
    }
  }

  delete(id: string): void {
    if (!confirm('Supprimer ce cours ?')) return;
    this.coursService.delete(id).subscribe({
      next: () => { this.successMessage = 'Cours supprimé.'; this.load(); },
      error: () => { this.errorMessage = 'Suppression impossible.'; }
    });
  }

  getClasseNom(classeId: string): string {
    const c = this.classes.find((x: any) => x.id === classeId);
    return c ? c.nom : classeId;
  }
}
