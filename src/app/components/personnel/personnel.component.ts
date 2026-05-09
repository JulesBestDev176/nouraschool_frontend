import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
})
export class PersonnelComponent implements OnInit {

  personnels: any[] = [];
  filteredPersonnels: any[] = [];

  personnelForm!: FormGroup;

  isModalOpen = false;
  isEditMode = false;

  selectedPersonnelId: string | null = null;

  // ================= FILTRES =================
  search = '';
  selectedType = '';
  selectedStatut = '';

  // ================= MODAL =================
  modalPersonnelType = '';

  // ================= MATIERES =================
  selectedMatieres: any[] = [];
  showMatiereDropdown = false;
  matiereSearch = '';

  // ================= DONNÉES =================
  utilisateurs = [
    { id: '1', nom: 'Ahmed Mohamed' },
    { id: '2', nom: 'Fatma Sow' }
  ];

  matieres = [
    { id: '1', nom: 'Mathématiques' },
    { id: '2', nom: 'Français' },
    { id: '3', nom: 'Physique' },
    { id: '4', nom: 'SVT' },
    { id: '5', nom: 'Anglais' }
  ];

  cycles = [
    { id: 'primaire', nom: 'Primaire' },
    { id: 'college', nom: 'Collège' },
    { id: 'lycee', nom: 'Lycée' }
  ];

  constructor(
    private fb: FormBuilder,
    private personnelService: PersonnelService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPersonnel();
  }

  // ================= FORM =================
  initForm() {

    this.personnelForm = this.fb.group({

      prenom: ['', Validators.required],

      nom: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      telephone: [''],

      type: ['', Validators.required],

      salaire: [0, Validators.required],

      adresse: [''],

      // IMPORTANT
      utilisateurId: ['', Validators.required],

      dateEmbauche: ['', Validators.required],

      numeroMatricule: [''],

      typeContrat: ['CDI'],

      soldeConge: [0],

      cycleId: ['']

    });

  }
  // ================= LOAD =================
  loadPersonnel(): void {

    this.personnelService.listPersonnel().subscribe({
      next: (res: any) => {

        this.personnels = res.content ?? res;
        this.filteredPersonnels = [...this.personnels];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ================= FILTER =================
  filterPersonnel(): void {

    this.filteredPersonnels = this.personnels.filter(personnel => {

      const fullText = `
        ${personnel.nom ?? ''}
        ${personnel.prenom ?? ''}
        ${personnel.email ?? ''}
      `.toLowerCase();

      const matchesSearch =
        fullText.includes(this.search.toLowerCase());

      const matchesType =
        !this.selectedType ||
        personnel.type === this.selectedType;

      const matchesStatut =
        !this.selectedStatut ||
        personnel.statut === this.selectedStatut;

      return matchesSearch && matchesType && matchesStatut;
    });
  }

  // ================= MODAL =================
  openModal(): void {

    this.isEditMode = false;

    this.personnelForm.reset({
      typeContrat: 'CDI',
      salaire: 0,
      soldeConge: 0
    });

    this.selectedMatieres = [];
    this.modalPersonnelType = '';
    this.selectedPersonnelId = null;

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // ================= SAVE =================
  savePersonnel() {

    if (this.personnelForm.invalid) {

      console.log(this.personnelForm.value);

      console.log(this.personnelForm.errors);

      this.personnelForm.markAllAsTouched();

      return;
    }

    const form = this.personnelForm.value;

    const dto = {

      utilisateurId: Number(form.utilisateurId),

      type: form.type,

      numeroMatricule: form.numeroMatricule,

      typeContrat: form.typeContrat,

      dateEmbauche: form.dateEmbauche,

      salaire: form.salaire,

      soldeConge: form.soldeConge,

      cycleId: form.cycleId,

      matieres: this.selectedMatieres.map(m => m.id)

    };
    console.log('DTO envoyé : ', dto);

    this.personnelService.createPersonnel(dto).subscribe({

      next: () => {

        this.loadPersonnel();

        this.closeModal();

      },

      error: err => {

        console.error(err);

      }

    });

  }

  // ================= EDIT =================
  editPersonnel(personnel: any): void {

    this.isEditMode = true;
    this.selectedPersonnelId = personnel.id;

    this.modalPersonnelType = personnel.type;

    this.personnelForm.patchValue({
      utilisateurId: personnel.utilisateurId,
      type: personnel.type,
      numeroMatricule: personnel.numeroMatricule,
      typeContrat: personnel.typeContrat,
      dateEmbauche: personnel.dateEmbauche,
      salaire: personnel.salaire,
      soldeConge: personnel.soldeConge,

      prenom: personnel.prenom,
      nom: personnel.nom,
      email: personnel.email,
      telephone: personnel.telephone,
      adresse: personnel.adresse,
      cycle: personnel.cycle
    });

    this.selectedMatieres = personnel.matieres ?? [];

    this.isModalOpen = true;
  }

  // ================= DELETE =================
  deletePersonnel(id: string): void {

    const confirmation = confirm('Voulez-vous supprimer ce personnel ?');

    if (!confirmation) return;

    this.personnelService.deletePersonnel(id).subscribe({
      next: () => {
        this.loadPersonnel();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  // ================= STATUT =================
  toggleStatus(personnel: any): void {

    personnel.statut =
      personnel.statut === 'actif'
        ? 'inactif'
        : 'actif';
  }

  // ================= MATIERES =================
  toggleMatiere(matiere: any): void {

    const exists = this.selectedMatieres.find(m => m.id === matiere.id);

    if (exists) {
      this.selectedMatieres =
        this.selectedMatieres.filter(m => m.id !== matiere.id);
    } else {
      this.selectedMatieres.push(matiere);
    }
  }

  removeMatiere(id: string): void {

    this.selectedMatieres =
      this.selectedMatieres.filter(m => m.id !== id);
  }

  isMatiereSelected(id: string): boolean {

    return this.selectedMatieres.some(m => m.id === id);
  }

  clearSearch(): void {
    this.matiereSearch = '';
  }

  // ================= FILTER MATIERES =================
  get filteredMatieres(): any[] {

    if (!this.matiereSearch) {
      return this.matieres;
    }

    return this.matieres.filter(m =>
      m.nom.toLowerCase()
        .includes(this.matiereSearch.toLowerCase())
    );
  }

  // ================= UTILS =================
  getInitiales(personnel: any): string {

    const prenom = personnel.prenom?.charAt(0) ?? '';
    const nom = personnel.nom?.charAt(0) ?? '';

    return (prenom + nom).toUpperCase();
  }
}