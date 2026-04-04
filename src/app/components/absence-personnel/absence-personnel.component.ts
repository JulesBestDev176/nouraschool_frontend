import { Component, OnInit } from '@angular/core';
import { AbsencePersonnelService } from '../../services/absence-personnel.service';
import { PersonnelService } from '../../services/personnel.service';

@Component({
  selector: 'app-absence-personnel',
  templateUrl: './absence-personnel.component.html',
  styleUrl: './absence-personnel.component.scss'
})
export class AbsencePersonnelComponent implements OnInit {
  absences: any[] = [];
  personnel: any[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  isModalOpen = false;
  isEditing = false;
  editingId: string | null = null;

  form = {
    personnelId: '',
    dateDebut: '',
    dateFin: '',
    motif: '',
    type: ''
  };

  absenceTypes = ['MALADIE', 'CONGE', 'AUTRE'];

  constructor(
    private readonly absencePersonnelService: AbsencePersonnelService,
    private readonly personnelService: PersonnelService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadPersonnel();
  }

  load(): void {
    this.loading = true;
    this.absencePersonnelService.list().subscribe({
      next: (data) => {
        this.absences = Array.isArray(data) ? data : (data as any)?.content ?? [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les absences.';
        this.loading = false;
      }
    });
  }

  loadPersonnel(): void {
    this.personnelService.listPersonnel().subscribe({
      next: (data) => {
        this.personnel = Array.isArray(data) ? data : (data as any)?.content ?? [];
      },
      error: () => {}
    });
  }

  openModal(): void {
    this.isEditing = false;
    this.editingId = null;
    this.form = { personnelId: '', dateDebut: '', dateFin: '', motif: '', type: '' };
    this.isModalOpen = true;
  }

  openEditModal(absence: any): void {
    this.isEditing = true;
    this.editingId = absence.id;
    this.form = {
      personnelId: absence.personnelId ?? '',
      dateDebut: absence.dateDebut ?? '',
      dateFin: absence.dateFin ?? '',
      motif: absence.motif ?? '',
      type: absence.type ?? ''
    };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  save(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.form.personnelId || !this.form.dateDebut) {
      this.errorMessage = 'Personnel et date de début sont obligatoires.';
      return;
    }

    const dto: Record<string, unknown> = { ...this.form };

    if (this.isEditing && this.editingId) {
      this.absencePersonnelService.update(this.editingId, dto).subscribe({
        next: () => { this.successMessage = 'Absence modifiée.'; this.closeModal(); this.load(); },
        error: () => { this.errorMessage = 'Modification impossible.'; }
      });
    } else {
      this.absencePersonnelService.create(dto).subscribe({
        next: () => { this.successMessage = 'Absence enregistrée.'; this.closeModal(); this.load(); },
        error: () => { this.errorMessage = 'Enregistrement impossible.'; }
      });
    }
  }

  valider(id: string): void {
    this.absencePersonnelService.validate(id).subscribe({
      next: () => { this.successMessage = 'Absence validée.'; this.load(); },
      error: () => { this.errorMessage = 'Validation impossible.'; }
    });
  }

  rejeter(id: string): void {
    this.absencePersonnelService.reject(id).subscribe({
      next: () => { this.successMessage = 'Absence rejetée.'; this.load(); },
      error: () => { this.errorMessage = 'Rejet impossible.'; }
    });
  }

  getPersonnelNom(id: string): string {
    const p = this.personnel.find((x: any) => x.id === id);
    return p ? `${p.prenom ?? ''} ${p.nom ?? ''}`.trim() : id;
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'VALIDEE': return 'bg-green-100 text-green-800';
      case 'REJETEE': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  }
}
