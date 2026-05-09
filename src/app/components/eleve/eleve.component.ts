import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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

  currentEleveId: string | null = null;

  allClasses: Classe[] = [];
  filteredClasses: Classe[] = [];

  parents: Parent[] = [];

  eleves: any[] = [];
  filteredEleves: any[] = [];

  searchQuery = '';
  filterClasseId = '';

  showClasseDropdown = false;
  classeSearch = '';
  selectedClasse: Classe | null = null;

  showTuteurDropdown = false;
  tuteurSearch = '';
  selectedTuteur: Parent | null = null;

  createdCredentials: {
    username: string;
    password: string;
    email: string;
  } | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private classeService: ClasseService,
    private parentService: ParentService,
    private eleveService: EleveService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  // ========================= LOAD =========================

  loadData(): void {

    this.classeService.listClasses().subscribe({
      next: (response: any) => {
        this.allClasses = response?.content ?? response ?? [];
        this.filteredClasses = [...this.allClasses];
      }
    });

    this.parentService.listParents().subscribe({
      next: (response: any) => {
        this.parents = response?.content ?? response ?? [];
      }
    });

    this.eleveService.listEleves().subscribe({
      next: (response: any) => {
        this.eleves = response?.content ?? response ?? [];
        this.applyFilters();
      }
    });
  }

  // ========================= FORM =========================

  initForm(): void {

    this.eleveForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      telephone: [''],

      dateNaissance: ['', Validators.required],

      lieuNaissance: [''],

      genre: ['', Validators.required],

      adresse: [''],

      classeId: ['', Validators.required],

      parent: ['', Validators.required],

      active: [true]
    });
  }

  // ========================= FILTER =========================

  applyFilters(): void {

    this.filteredEleves = this.eleves.filter(e => {

      const matchesSearch =
        !this.searchQuery ||
        e.firstName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        e.lastName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        e.email?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesClasse =
        !this.filterClasseId ||
        e.classeId === this.filterClasseId;

      return matchesSearch && matchesClasse;
    });
  }

  // ========================= MODAL =========================

  openModal(eleve?: any): void {

    this.isEditing = !!eleve;

    this.currentEleveId = eleve?.id ?? null;

    this.eleveForm.reset({
      active: true
    });

    this.selectedClasse = null;
    this.selectedTuteur = null;

    this.classeSearch = '';
    this.tuteurSearch = '';

    if (eleve) {

      this.eleveForm.patchValue({

        firstName: eleve.firstName,

        lastName: eleve.lastName,

        email: eleve.email,

        telephone: eleve.telephone,

        dateNaissance: eleve.dateNaissance,

        lieuNaissance: eleve.lieuNaissance,

        genre: eleve.genre,

        adresse: eleve.adresse,

        classeId: eleve.classeId,

        active: eleve.active
      });

      // Classe
      const classe = this.allClasses.find(c => c.id === eleve.classeId);

      if (classe) {
        this.selectedClasse = classe;
        this.classeSearch = classe.nom;
      }

      // Parent
      if (eleve.parentIds?.length) {

        const parent = this.parents.find(
          p => p.id === eleve.parentIds[0]
        );

        if (parent) {

          this.selectedTuteur = parent;

          this.tuteurSearch =
            `${parent.prenom} ${parent.nom}`;

          this.eleveForm.patchValue({
            parent: this.tuteurSearch
          });
        }
      }
    }

    this.isModalOpen = true;
  }

  closeModal(): void {

    this.isModalOpen = false;

    this.isEditing = false;

    this.currentEleveId = null;

    this.eleveForm.reset();

    this.selectedClasse = null;
    this.selectedTuteur = null;

    this.classeSearch = '';
    this.tuteurSearch = '';
  }

  // ========================= SUBMIT =========================

  onSubmit() {

    if (this.eleveForm.invalid) {
      this.eleveForm.markAllAsTouched();
      return;
    }

    const formValue = this.eleveForm.value;

    const eleveData = {

      firstName: formValue.firstName,
      lastName: formValue.lastName,

      email: formValue.email,
      telephone: formValue.telephone,
      adresse: formValue.adresse,

      dateNaissance: formValue.dateNaissance,
      lieuNaissance: formValue.lieuNaissance,

      genre: formValue.genre === 'MASCULIN' ? 'MASCULIN' : formValue.genre === 'FEMININ' ? 'FEMININ' : undefined,

      cycle: formValue.cycle,

      classeId: this.selectedClasse?.id,

      parentIds: this.selectedTuteur
        ? [this.selectedTuteur.id]
        : [],

      active: formValue.statut === 'actif'
    };

    console.log('DATA ENVOYEE => ', eleveData);

    // =========================================
    // UPDATE
    // =========================================
    if (this.isEditing && this.currentEleveId) {

      this.eleveService
        .updateEleve(this.currentEleveId, eleveData)
        .subscribe({

          next: (updated) => {

            const index = this.eleves.findIndex(
              e => e.id === this.currentEleveId
            );

            if (index !== -1) {
              this.eleves[index] = updated;
            }

            this.applyFilters();

            this.closeModal();
          },

          error: (err) => {

            console.error('ERREUR UPDATE => ', err);

            if (err?.error?.details) {
              console.log('DETAILS VALIDATION => ', err.error.details);
            }
          }
        });

    }

    // =========================================
    // CREATE
    // =========================================
    else {

      this.eleveService
        .createEleve(eleveData)
        .subscribe({

          next: (newEleve) => {

            this.eleves.push(newEleve);

            this.applyFilters();

            if (
              newEleve?.generatedUsername &&
              newEleve?.generatedPassword
            ) {

              this.createdCredentials = {
                username: newEleve.generatedUsername,
                password: newEleve.generatedPassword,
                email: newEleve.email
              };
            }

            this.closeModal();
          },

          error: (err) => {

            console.error('ERREUR CREATE => ', err);

            if (err?.error?.details) {
              console.log('DETAILS VALIDATION => ', err.error.details);
            }
          }
        });
    }
  }

  // ========================= CUSTOM SELECT =========================

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {

    const target = event.target as HTMLElement;

    if (!target.closest('.custom-select-container')) {

      this.showClasseDropdown = false;

      this.showTuteurDropdown = false;
    }
  }

  // ========================= CLASSE =========================

  get filteredClassesDisplay(): Classe[] {

    let list = this.filteredClasses;

    if (this.classeSearch) {

      const search = this.classeSearch.toLowerCase();

      list = list.filter(c =>
        c.nom.toLowerCase().includes(search)
      );
    }

    return list;
  }

  selectClasse(classe: Classe): void {

    this.selectedClasse = classe;

    this.classeSearch = classe.nom;

    this.eleveForm.patchValue({
      classeId: classe.id
    });

    this.showClasseDropdown = false;
  }

  clearClasseSearch(): void {

    this.selectedClasse = null;

    this.classeSearch = '';

    this.eleveForm.patchValue({
      classeId: ''
    });
  }

  // ========================= TUTEUR =========================

  get filteredTuteursDisplay(): Parent[] {

    let list = this.parents;

    if (this.tuteurSearch) {

      const search = this.tuteurSearch.toLowerCase();

      list = list.filter(p =>

        p.nom.toLowerCase().includes(search) ||

        p.prenom.toLowerCase().includes(search) ||

        p.email?.toLowerCase().includes(search)
      );
    }

    return list;
  }

  selectTuteur(tuteur: Parent): void {

    this.selectedTuteur = tuteur;

    const fullName =
      `${tuteur.prenom} ${tuteur.nom}`;

    this.tuteurSearch = fullName;

    this.eleveForm.patchValue({
      parent: fullName
    });

    this.showTuteurDropdown = false;
  }

  onTuteurSearchChange(value: string): void {

    this.tuteurSearch = value;

    this.eleveForm.patchValue({
      parent: value
    });
  }

  clearTuteurSearch(): void {

    this.selectedTuteur = null;

    this.tuteurSearch = '';

    this.eleveForm.patchValue({
      parent: ''
    });
  }

  // ========================= UTILS =========================

  getClasseName(id: string): string {

    return this.allClasses.find(
      c => c.id === id
    )?.nom ?? 'N/A';
  }

  getParentNames(ids: string[]): string {

    if (!ids?.length) {
      return 'Aucun parent';
    }

    return ids.map(id => {

      const p = this.parents.find(
        parent => parent.id === id
      );

      return p
        ? `${p.prenom} ${p.nom}`
        : '';

    }).join(', ');
  }

  get canAddEleve(): boolean {

    const user = this.authService.currentUserValue;

    return user
      ? ['ADMIN', 'SUPER_ADMIN'].includes(user.role)
      : false;
  }

  closeCredentialsBanner(): void {
    this.createdCredentials = null;
  }
}