import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { AnneeAcademique } from '../../models/annee-academique';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {

  currentYear = '';
  classes: any[] = [];

  searchQuery = '';
  selectedNiveau = '';

  // MODAL
  isModalOpen = false;
  isEditing = false;
  currentClasseId: string | null = null;

  classeForm!: FormGroup;

  constructor(
    private classeService: ClasseService,
    private anneeService: AnneeAcademiqueService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  // ================= INIT FORM =================
  initForm() {
    this.classeForm = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required],
      anneeScolaire: [''],
      effectifMax: [0, Validators.required],
      salleClasse: ['']
    });
  }

  // ================= LOAD =================
  loadData() {

    this.anneeService.getCourante().subscribe((a: AnneeAcademique) => {
      this.currentYear = a.libelle ?? 'N/A';
    });

    this.classeService.listClasses().subscribe((res) => {
      this.classes = res.content ?? [];
    });
  }

  // ================= FILTER =================
  get filteredClasses() {
    return this.classes.filter(c => {

      const matchSearch =
        c.nom?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.niveau?.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchNiveau =
        !this.selectedNiveau || c.niveau === this.selectedNiveau;

      return matchSearch && matchNiveau;
    });
  }

  // ================= MODAL =================
  openModal(classe?: any) {
    this.isModalOpen = true;
    this.isEditing = !!classe;

    if (classe) {
      this.currentClasseId = classe.id;

      this.classeForm.patchValue({
        nom: classe.nom,
        niveau: classe.niveau,
        anneeScolaire: classe.anneeScolaire,
        effectifMax: classe.effectifMax,
        salleClasse: classe.salleClasse
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.classeForm.reset();
    this.isEditing = false;
    this.currentClasseId = null;
  }

  // ================= SUBMIT =================
  onSubmit() {
    if (this.classeForm.invalid) return;

    const data = this.classeForm.value;

    if (this.isEditing && this.currentClasseId) {
      this.classeService.updateClasse(this.currentClasseId, data)
        .subscribe(() => this.loadData());
    } else {
      this.classeService.createClasse(data)
        .subscribe(() => this.loadData());
    }

    this.closeModal();
  }
}