import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Classe } from '../../models/classe';
import { Parent } from '../../models/parent';
import { Eleve } from '../../models/eleve';
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
  eleves: Eleve[] = [];
  filteredEleves: Eleve[] = [];

  // Filters
  searchQuery = '';
  filterCycle = '';
  filterClasseId = '';
  filterStatut = '';

  // Custom Select States
  showClasseDropdown = false;
  classeSearch = '';
  selectedClasse: Classe | null = null;

  showTuteurDropdown = false;
  tuteurSearch = '';
  selectedTuteur: Parent | null = null;
  createdCredentials: { username: string; password: string; email: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private classeService: ClasseService,
    private parentService: ParentService,
    private eleveService: EleveService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  loadData() {
    this.classeService.listClasses().subscribe((response) => {
      this.allClasses = response.content ?? [];
      this.filteredClasses = [...this.allClasses];
    });
    this.parentService.listParents().subscribe((response) => {
      this.parents = response.content ?? [];
    });
    this.eleveService.listEleves().subscribe((response) => {
      this.eleves = response.content ?? [];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredEleves = this.eleves.filter(e => {
      const matchesSearch = !this.searchQuery ||
        (e.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          e.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          e.email.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchesCycle = !this.filterCycle || e.cycle === this.filterCycle;
      const matchesClasse = !this.filterClasseId || e.classeId === this.filterClasseId;
      const matchesStatut = !this.filterStatut || e.statut === this.filterStatut;

      return matchesSearch && matchesCycle && matchesClasse && matchesStatut;
    });
  }

  initForm() {
    this.eleveForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      dateNaissance: ['', Validators.required],
      lieuNaissance: [''],
      sexe: ['', Validators.required],
      cycle: [''],
      classeId: [''],
      parent: ['', Validators.required],
      adresse: [''],
      statut: ['actif']
    });
  }

  openModal(eleve?: Eleve) {
    this.isEditing = !!eleve;
    this.currentEleveId = eleve ? eleve.id : null;
    this.eleveForm.reset({ statut: 'actif' });

    if (eleve) {
      this.eleveForm.patchValue({
        prenom: eleve.prenom,
        nom: eleve.nom,
        email: eleve.email,
        telephone: eleve.telephone,
        dateNaissance: eleve.dateNaissance,
        lieuNaissance: eleve.lieuNaissance,
        sexe: eleve.sexe,
        cycle: eleve.cycle,
        classeId: eleve.classeId,
        adresse: eleve.adresse,
        statut: eleve.statut
      });
      // Handle custom selects population
      if (eleve.classeId) {
        const classe = this.allClasses.find(c => c.id === eleve.classeId);
        if (classe) {
          this.selectedClasse = classe;
          this.classeSearch = classe.nom;
        }
      }
      if (eleve.parentIds && eleve.parentIds.length > 0) {
        const parentId = eleve.parentIds[0];
        const parent = this.parents.find(p => p.id === parentId);
        if (parent) {
          this.selectedTuteur = parent;
          this.tuteurSearch = `${parent.prenom} ${parent.nom}`;
          this.eleveForm.patchValue({ parent: this.tuteurSearch });
        }
      }
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.eleveForm.reset();
    this.isModalOpen = false;
    this.isEditing = false;
    this.currentEleveId = null;
    this.selectedClasse = null;
    this.classeSearch = '';
    this.selectedTuteur = null;
    this.tuteurSearch = '';
  }

  closeCredentialsBanner() {
    this.createdCredentials = null;
  }

  onSubmit() {
    if (this.eleveForm.invalid) return;

    const formValue = this.eleveForm.value;
    const parentIds = this.selectedTuteur ? [this.selectedTuteur.id] : [];

    // Map form to Eleve model
    const eleveData: any = {
      ...formValue,
      parentIds: parentIds,
      statut: formValue.statut || 'actif'
    };

    // Remove the 'parent' string field which is UI-only
    delete eleveData.parent;

    if (!this.isEditing) {
      // Cycle/classe are assigned during inscription workflow, not student creation.
      delete eleveData.cycle;
      delete eleveData.classeId;
    }

    if (this.isEditing && this.currentEleveId) {
      this.eleveService.updateEleve(this.currentEleveId, eleveData).subscribe((updated) => {
        const index = this.eleves.findIndex(e => e.id === this.currentEleveId);
        if (index !== -1) {
          this.eleves[index] = updated;
        }
        this.applyFilters();
      });
    } else {
      this.eleveService.createEleve(eleveData).subscribe((newEleve) => {
        this.eleves.push(newEleve);
        this.applyFilters();
        if (newEleve.generatedUsername && newEleve.generatedPassword) {
          this.createdCredentials = {
            username: newEleve.generatedUsername,
            password: newEleve.generatedPassword,
            email: newEleve.email
          };
        }
      });
    }

    this.closeModal();
  }

  get canAddEleve(): boolean {
    const user = this.authService.currentUserValue;
    return user ? ['ADMIN', 'SUPER_ADMIN'].includes(user.role) : false;
  }

  onCycleChange() {
    const cycle = this.eleveForm.get('cycle')?.value;
    this.selectedClasse = null;
    this.eleveForm.get('classeId')?.setValue('');
    this.classeSearch = '';

    if (!cycle) {
      this.filteredClasses = [...this.allClasses];
      return;
    }

    // Filtrage par cycle
    this.filteredClasses = this.allClasses.filter(c => {
      const niv = c.niveau.toLowerCase();
      if (cycle === 'primaire') return ['ci', 'cp', 'ce', 'cm'].some(l => niv.includes(l));
      if (cycle === 'college') return ['6', '5', '4', '3'].some(l => niv.includes(l));
      if (cycle === 'lycee') return ['2', '1', 't', '7'].some(l => niv.includes(l));
      return true;
    });
  }

  getPlacesRestantes(classe: Classe): number {
    return classe.nombreMaxEleves - (classe.elevesIds?.length || 0);
  }

  // Custom Dropdown Logic
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-container')) {
      this.showClasseDropdown = false;
      this.showTuteurDropdown = false;
    }
  }

  // Gestion Classe
  get filteredClassesDisplay() {
    let list = this.filteredClasses;
    if (this.classeSearch) {
      const search = this.classeSearch.toLowerCase();
      list = list.filter(c => c.nom.toLowerCase().includes(search));
    }
    return list;
  }

  selectClasse(classe: Classe) {
    this.selectedClasse = classe;
    this.eleveForm.patchValue({ classeId: classe.id });
    this.classeSearch = classe.nom;
    this.showClasseDropdown = false;
  }

  // Gestion Tuteur
  get filteredTuteursDisplay() {
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

  selectTuteur(tuteur: Parent) {
    this.selectedTuteur = tuteur;
    const fullName = `${tuteur.prenom} ${tuteur.nom}`;
    this.eleveForm.patchValue({ parent: fullName });
    this.tuteurSearch = fullName;
    this.showTuteurDropdown = false;
  }

  // Pour permettre la saisie libre (nouveau tuteur)
  onTuteurSearchChange(searchValue: string) {
    this.tuteurSearch = searchValue;
    this.eleveForm.patchValue({ parent: searchValue });
  }

  clearClasseSearch() {
    this.classeSearch = '';
    this.selectedClasse = null;
    this.eleveForm.patchValue({ classeId: '' });
  }

  clearTuteurSearch() {
    this.tuteurSearch = '';
    this.selectedTuteur = null;
    this.eleveForm.patchValue({ parent: '' });
  }

  toggleStatus(eleve: Eleve) {
    eleve.statut = eleve.statut === 'actif' ? 'inactif' : 'actif';
  }

  getClasseName(id: string): string {
    return this.allClasses.find(c => c.id === id)?.nom || 'N/A';
  }

  getParentNames(ids: string[]): string {
    if (!ids || ids.length === 0) return 'Aucun parent';
    return ids.map(id => {
      const p = this.parents.find(parent => parent.id === id);
      return p ? `${p.prenom} ${p.nom}` : '';
    }).filter(n => n).join(', ');
  }
}
