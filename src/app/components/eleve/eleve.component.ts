import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Classe } from '../../models/classe';
import { Parent } from '../../models/parent';
import { ClasseService } from '../../services/classe.service';
import { ParentService } from '../../services/parent.service';
import { EleveService } from '../../services/eleve.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrl: './eleve.component.scss'
})
export class EleveComponent implements OnInit {

  eleveForm!: FormGroup;
  isModalOpen = false;
  isEditing = false;
  loading = true;
  currentEleveId: string | null = null;

  allClasses: Classe[] = [];
  parents: Parent[] = [];
  eleves: any[] = [];
  filteredEleves: any[] = [];

  searchQuery = '';
  filterClasseId = '';

  createdCredentials: { username: string; password: string; email: string } | null = null;

  genreOptions = [
    { label: 'Masculin', value: 'MASCULIN' },
    { label: 'Féminin',  value: 'FEMININ'  }
  ];

  classeOptions: { label: string; value: string }[] = [];
  parentOptions: { label: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private classeService: ClasseService,
    private parentService: ParentService,
    private eleveService: EleveService,
    private messageService: MessageService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  loadData(): void {
    this.classeService.listClasses().subscribe({
      next: (r: any) => {
        this.allClasses = r?.content ?? r ?? [];
        this.classeOptions = this.allClasses.map(c => ({ label: c.nom, value: c.id }));
      }
    });
    this.parentService.listParents().subscribe({
      next: (r: any) => {
        this.parents = r?.content ?? r ?? [];
        this.parentOptions = this.parents.map(p => ({
          label: `${p.prenom} ${p.nom}`,
          value: p.id
        }));
      }
    });
    this.eleveService.listEleves().subscribe({
      next: (r: any) => {
        this.eleves = r?.content ?? r ?? [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  initForm(): void {
    this.eleveForm = this.fb.group({
      firstName:     ['', Validators.required],
      lastName:      ['', Validators.required],
      email:         ['', [Validators.required, Validators.email]],
      telephone:     [''],
      matricule:     ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: [''],
      genre:         ['', Validators.required],
      numeroUrgence: [''],
      dateInscription: [new Date()],
      photoUrl:      [''],
      adresse:       [''],
      classeId:      ['', Validators.required],
      parent:        ['', Validators.required],
      active:        [true]
    });
  }

  applyFilters(): void {
    this.filteredEleves = this.eleves.filter(e => {
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q ||
        e.firstName?.toLowerCase().includes(q) ||
        e.lastName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q);
      const matchClasse = !this.filterClasseId || e.classeId === this.filterClasseId;
      return matchSearch && matchClasse;
    });
  }

  openModal(eleve?: any): void {
    this.isEditing = !!eleve;
    this.currentEleveId = eleve?.id ?? null;
    this.eleveForm.reset({ active: true, dateInscription: new Date() });

    if (eleve) {
      this.eleveForm.patchValue({
        firstName: eleve.firstName, lastName: eleve.lastName,
        email: eleve.email, telephone: eleve.telephone,
        dateNaissance: this.toCalendarDate(eleve.dateNaissance), lieuNaissance: eleve.lieuNaissance,
        genre: eleve.genre, adresse: eleve.adresse,
        matricule: eleve.matricule, numeroUrgence: eleve.numeroUrgence,
        dateInscription: this.toCalendarDate(eleve.dateInscription), photoUrl: eleve.photoUrl,
        classeId: eleve.classeId, active: eleve.active
      });
      if (eleve.parentIds?.length) {
        this.eleveForm.patchValue({ parent: eleve.parentIds[0] });
      }
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentEleveId = null;
    this.eleveForm.reset();
  }

  onSubmit(): void {
    if (this.eleveForm.invalid) { this.eleveForm.markAllAsTouched(); return; }

    const v = this.eleveForm.value;
    const payload = {
      firstName: v.firstName, lastName: v.lastName,
      email: v.email, telephone: v.telephone,
      matricule: v.matricule,
      adresse: v.adresse, dateNaissance: v.dateNaissance,
      lieuNaissance: v.lieuNaissance, genre: v.genre,
      numeroUrgence: v.numeroUrgence,
      dateInscription: v.dateInscription,
      photoUrl: v.photoUrl,
      classeId: v.classeId,
      parentIds: v.parent ? [v.parent] : [],
      active: v.active
    };

    if (this.isEditing && this.currentEleveId) {
      this.eleveService.updateEleve(this.currentEleveId, payload).subscribe({
        next: (updated) => {
          const i = this.eleves.findIndex(e => e.id === this.currentEleveId);
          if (i !== -1) this.eleves[i] = updated;
          this.applyFilters();
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Élève modifié avec succès' });
        },
        error: () => this.alert.error('Erreur', 'Impossible de modifier l\'élève.')
      });
    } else {
      this.eleveService.createEleve(payload).subscribe({
        next: (newEleve) => {
          this.eleves.push(newEleve);
          this.applyFilters();
          if (newEleve?.generatedUsername && newEleve?.generatedPassword) {
            this.createdCredentials = {
              username: newEleve.generatedUsername,
              password: newEleve.generatedPassword,
              email: newEleve.email
            };
          }
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Élève ajouté avec succès' });
        },
        error: () => this.alert.error('Erreur', 'Impossible d\'ajouter l\'élève.')
      });
    }
  }

  getClasseName(id: string): string {
    return this.allClasses.find(c => c.id === id)?.nom ?? '—';
  }

  getParentNames(ids: string[]): string {
    if (!ids?.length) return '—';
    return ids.map(id => {
      const p = this.parents.find(x => x.id === id);
      return p ? `${p.prenom} ${p.nom}` : '';
    }).filter(Boolean).join(', ');
  }

  get canAddEleve(): boolean {
    const user = this.authService.currentUserValue;
    return user ? ['ADMIN', 'SUPER_ADMIN'].includes(user.role) : false;
  }

  private toCalendarDate(value: Date | string | null | undefined): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    return year && month && day ? new Date(year, month - 1, day) : null;
  }
}
