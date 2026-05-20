import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Classe } from '../../models/classe';
import { Parent } from '../../models/parent';
import { Eleve } from '../../models/eleve';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import * as SchoolActions from '../../store/school/school.actions';
import { selectClasses, selectEleves, selectParents, selectSchoolError } from '../../store/school/school.selectors';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrl: './eleve.component.scss'
})
export class EleveComponent implements OnInit, OnDestroy {

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
  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.bindState();
    this.bindActions();
    this.loadData();
    this.handleQuickAction();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========================= LOAD =========================

  loadData(): void {
    this.store.dispatch(SchoolActions.loadSchoolReferenceData());
    this.store.dispatch(SchoolActions.loadEleves({ page: 0, size: 50 }));
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

        genre: this.toFormGenre(eleve.genre),

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
    const genre: Eleve['genre'] = formValue.genre === 'M'
      ? 'M'
      : formValue.genre === 'F'
        ? 'F'
        : undefined;

    const eleveData: Partial<Eleve> = {

      firstName: formValue.firstName,
      lastName: formValue.lastName,

      email: formValue.email,
      telephone: formValue.telephone,
      adresse: formValue.adresse,

      dateNaissance: formValue.dateNaissance,
      lieuNaissance: formValue.lieuNaissance,

      genre,

      cycle: formValue.cycle,

      classeId: this.selectedClasse?.id,

      parentIds: this.selectedTuteur
        ? [this.selectedTuteur.id]
        : [],

      active: formValue.active !== false
    };

    // =========================================
    // UPDATE
    // =========================================
    if (this.isEditing && this.currentEleveId) {

      this.store.dispatch(SchoolActions.updateEleve({ id: this.currentEleveId, changes: eleveData }));

    }

    // =========================================
    // CREATE
    // =========================================
    else {

      this.store.dispatch(SchoolActions.createEleve({ eleve: eleveData }));
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

  private bindState(): void {
    this.store.select(selectClasses).pipe(takeUntil(this.destroy$)).subscribe((classes) => {
      this.allClasses = classes;
      this.filteredClasses = [...classes];
    });

    this.store.select(selectParents).pipe(takeUntil(this.destroy$)).subscribe((parents) => {
      this.parents = parents;
    });

    this.store.select(selectEleves).pipe(takeUntil(this.destroy$)).subscribe((eleves) => {
      this.eleves = eleves;
      this.applyFilters();
    });

    this.store.select(selectSchoolError).pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        console.error('[EleveComponent] Erreur store school:', error);
      }
    });
  }

  private bindActions(): void {
    this.actions$
      .pipe(ofType(SchoolActions.createEleveSuccess), takeUntil(this.destroy$))
      .subscribe(({ eleve }) => {
        if (eleve.generatedUsername && eleve.generatedPassword) {
          this.createdCredentials = {
            username: eleve.generatedUsername,
            password: eleve.generatedPassword,
            email: eleve.email
          };
        }
        this.closeModal();
      });

    this.actions$
      .pipe(ofType(SchoolActions.updateEleveSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.closeModal());
  }

  displayGenre(genre?: Eleve['genre']): string {
    const normalized = this.toFormGenre(genre);
    if (normalized === 'M') {
      return 'Masculin';
    }
    if (normalized === 'F') {
      return 'Féminin';
    }
    return 'Non renseigné';
  }

  private toFormGenre(genre?: Eleve['genre']): 'M' | 'F' | '' {
    if (genre === 'M' || genre === 'MASCULIN') {
      return 'M';
    }
    if (genre === 'F' || genre === 'FEMININ') {
      return 'F';
    }
    return '';
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
