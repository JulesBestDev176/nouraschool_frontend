import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { AlertService } from '../../services/alert.service';

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

  search = '';
  selectedType = '';
  selectedStatut = '';

  modalPersonnelType = '';

  selectedMatieres: any[] = [];
  showMatiereDropdown = false;
  matiereSearch = '';

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
    private personnelService: PersonnelService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadPersonnel();
    this.handleQuickAction();
  }

  initForm() {
    this.personnelForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      type: ['', Validators.required],
      salaire: [0, Validators.required],
      adresse: [''],
      utilisateurId: ['', Validators.required],
      dateEmbauche: ['', Validators.required],
      numeroMatricule: [''],
      typeContrat: ['CDI'],
      soldeConge: [0],
      cycleId: ['']
    });
  }

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

  savePersonnel() {
    if (this.personnelForm.invalid) {
      this.personnelForm.markAllAsTouched();
      this.alertService.warning('Champs requis', 'Veuillez compléter les champs obligatoires.');
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

    this.personnelService.createPersonnel(dto).subscribe({
      next: () => {
        this.loadPersonnel();
        this.closeModal();
        this.alertService.success('Succès', 'Personnel créé.');
      },
      error: (err) => {
        console.error(err);
        this.alertService.error('Création impossible', 'Le personnel n’a pas pu être créé.');
      }
    });
  }

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

  async deletePersonnel(id: string): Promise<void> {
    const result = await this.alertService.confirmDelete('ce personnel');
    if (!result.isConfirmed) return;

    this.personnelService.deletePersonnel(id).subscribe({
      next: () => {
        this.loadPersonnel();
        this.alertService.success('Succès', 'Personnel supprimé.');
      },
      error: err => {
        console.error(err);
        this.alertService.error('Suppression impossible', 'Le personnel n’a pas pu être supprimé.');
      }
    });
  }

  toggleStatus(personnel: any): void {
    personnel.statut =
      personnel.statut === 'actif'
        ? 'inactif'
        : 'actif';
  }

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

  get filteredMatieres(): any[] {
    if (!this.matiereSearch) {
      return this.matieres;
    }

    return this.matieres.filter(m =>
      m.nom.toLowerCase()
        .includes(this.matiereSearch.toLowerCase())
    );
  }

  getInitiales(personnel: any): string {
    const prenom = personnel.prenom?.charAt(0) ?? '';
    const nom = personnel.nom?.charAt(0) ?? '';

    return (prenom + nom).toUpperCase();
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
