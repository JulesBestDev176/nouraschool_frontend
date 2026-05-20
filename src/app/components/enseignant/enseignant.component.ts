import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnseignantService } from '../../services/enseignant.service';
import { Enseignant } from '../../models/enseignant';

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrl: './enseignant.component.scss'
})
export class EnseignantComponent implements OnInit {
  enseignants: Enseignant[] = [];
  filteredEnseignants: Enseignant[] = [];
  searchQuery = '';

  enseignantForm!: FormGroup;
  isModalOpen = false;
  isEditing = false;
  currentEnseignantId: string | null = null;
  errorMessage = '';

  constructor(
    private readonly enseignantService: EnseignantService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEnseignants();
  }

  private initForm(): void {
    this.enseignantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
      specialite: [''],
      active: [true]
    });
  }

  loadEnseignants(): void {
    this.enseignantService.listEnseignants().subscribe({
      next: (response) => {
        this.enseignants = response.content ?? [];
        this.filterEnseignants();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les enseignants.';
      }
    });
  }

  openModal(enseignant?: Enseignant): void {
    this.errorMessage = '';
    this.isEditing = !!enseignant;
    this.currentEnseignantId = enseignant?.id ?? null;

    if (enseignant) {
      this.enseignantForm.patchValue({
        firstName: enseignant.firstName ?? enseignant.prenom ?? '',
        lastName: enseignant.lastName ?? enseignant.nom ?? '',
        email: enseignant.email ?? '',
        telephone: enseignant.telephone ?? '',
        adresse: enseignant.adresse ?? '',
        specialite: enseignant.specialite ?? '',
        active: enseignant.active ?? (enseignant.statut !== 'inactif')
      });
    } else {
      this.enseignantForm.reset({
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        adresse: '',
        specialite: '',
        active: true
      });
    }

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentEnseignantId = null;
  }

  onSubmit(): void {
    if (this.enseignantForm.invalid) {
      return;
    }

    this.errorMessage = '';
    const v = this.enseignantForm.value;

    if (this.isEditing && this.currentEnseignantId) {
      this.enseignantService.updateEnseignant(this.currentEnseignantId, v).subscribe({
        next: () => {
          this.closeModal();
          this.loadEnseignants();
        },
        error: () => {
          this.errorMessage = 'La modification a echoue.';
        }
      });
      return;
    }

    const createPayload = {
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email,
      telephone: v.telephone,
      adresse: v.adresse,
      specialite: v.specialite
    };

    this.enseignantService.createEnseignant(createPayload).subscribe({
      next: () => {
        this.closeModal();
        this.loadEnseignants();
      },
      error: () => {
        this.errorMessage = 'La creation a echoue.';
      }
    });
  }

  filterEnseignants(): void {
    const search = this.searchQuery.trim().toLowerCase();
    if (!search) {
      this.filteredEnseignants = [...this.enseignants];
      return;
    }

    this.filteredEnseignants = this.enseignants.filter((e) => {
      const fullName = `${e.firstName ?? e.prenom ?? ''} ${e.lastName ?? e.nom ?? ''}`.toLowerCase();
      return fullName.includes(search)
        || String(e.email ?? '').toLowerCase().includes(search)
        || String(e.matricule ?? '').toLowerCase().includes(search)
        || String(e.specialite ?? '').toLowerCase().includes(search);
    });
  }
}
