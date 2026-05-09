import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatiereService } from '../../services/matiere.service';
import { Matiere } from '../../models/matiere';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.scss'
})
export class MatiereComponent implements OnInit {

  matieres: Matiere[] = [];
  filteredMatieres: Matiere[] = [];

  isModalOpen = false;
  isEditing = false;
  currentId: string | null = null;

  searchQuery = '';

  matiereForm!: FormGroup;

  constructor(
    private readonly matiereService: MatiereService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadMatieres();
  }

  // ================= INIT FORM =================
  initForm() {
    this.matiereForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      description: [''],
      coefficient: [1],          // valeur par défaut
      categorie: ['GENERAL']    // valeur par défaut
    });
  }

  // ================= LOAD =================
  loadMatieres() {
    this.matiereService.listMatieres().subscribe((response) => {
      this.matieres = response.content ?? [];
      this.filteredMatieres = [...this.matieres];
    });
  }

  // ================= FILTER =================
  onSearch(query: string) {
    this.searchQuery = query;

    this.filteredMatieres = this.matieres.filter(m =>
      m.nom.toLowerCase().includes(query.toLowerCase()) ||
      m.code.toLowerCase().includes(query.toLowerCase()) ||
      m.categorie.toLowerCase().includes(query.toLowerCase())
    );
  }

  // ================= MODAL =================
  openModal(matiere?: Matiere) {
    this.isModalOpen = true;
    this.isEditing = !!matiere;
    this.currentId = matiere ? matiere.id : null;

    if (matiere) {
      this.matiereForm.patchValue(matiere);
    } else {
      this.matiereForm.reset({
        coefficient: 1
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.matiereForm.reset();
    this.currentId = null;
    this.isEditing = false;
  }

  // ================= SUBMIT =================
  onSubmit() {
    if (this.matiereForm.invalid) return;

    const data = this.matiereForm.value;

    if (this.isEditing && this.currentId) {
      this.matiereService.updateMatiere(this.currentId, data).subscribe((res) => {
        const index = this.matieres.findIndex(m => m.id === this.currentId);
        if (index !== -1) this.matieres[index] = res;

        this.filteredMatieres = [...this.matieres];
      });
    } else {
      this.matiereService.createMatiere(data).subscribe((res) => {
        this.matieres.push(res);
        this.filteredMatieres = [...this.matieres];
      });
    }

    this.closeModal();
  }

  // ================= DELETE =================
  deleteMatiere(id: string) {
    this.matiereService.deleteMatiere(id).subscribe(() => {
      this.matieres = this.matieres.filter(m => m.id !== id);
      this.filteredMatieres = [...this.matieres];
    });
  }
}