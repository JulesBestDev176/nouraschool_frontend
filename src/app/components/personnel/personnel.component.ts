import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent implements OnInit {
  personnelForm!: FormGroup;
  isModalOpen = false;
  selectedType = '';
  modalPersonnelType = '';
  matieres = [
    { id: 1, nom: 'Mathématiques' },
    { id: 2, nom: 'Français' },
    { id: 3, nom: 'Physique' },
    { id: 4, nom: 'Arabe' }
  ];
  matiereSearch = '';

  selectedMatieres: any[] = [];
  showMatiereDropdown = false;

  cycles = [
    { id: 'primaire', nom: 'Primaire' },
    { id: 'college', nom: 'Collège' },
    { id: 'lycee', nom: 'Lycée' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.personnelForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      type: ['', Validators.required],
      adresse: ['']
    });

    // Synchronisation bidirectionnelle pour modalPersonnelType
    this.personnelForm.get('type')?.valueChanges.subscribe(value => {
      this.modalPersonnelType = value;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showMatiereDropdown = false;
    }
  }

  toggleMatiere(matiere: any) {
    const index = this.selectedMatieres.findIndex(m => m.id === matiere.id);
    if (index > -1) {
      this.selectedMatieres.splice(index, 1);
    } else {
      this.selectedMatieres.push(matiere);
    }
  }

  isMatiereSelected(matiereId: number): boolean {
    return this.selectedMatieres.some(m => m.id === matiereId);
  }

  removeMatiere(matiereId: number) {
    this.selectedMatieres = this.selectedMatieres.filter(m => m.id !== matiereId);
  }

  get filteredMatieres() {
    if (!this.matiereSearch) return this.matieres;
    const search = this.matiereSearch.toLowerCase().trim();
    return this.matieres.filter(m => 
      m.nom.toLowerCase().includes(search)
    );
  }

  clearSearch() {
    this.matiereSearch = '';
  }

  openModal() {
    this.personnelForm.reset({ type: '' });
    this.modalPersonnelType = '';
    this.selectedMatieres = [];
    this.matiereSearch = '';
    this.isModalOpen = true;
  }

  closeModal() {
    this.personnelForm.reset();
    this.modalPersonnelType = '';
    this.isModalOpen = false;
  }

}
