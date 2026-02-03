import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';
import { Parent } from '../../models/parent';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements OnInit {
  parents: Parent[] = [];
  filteredParents: Parent[] = [];
  searchQuery = '';
  
  parentForm!: FormGroup;
  isModalOpen = false;
  isEditing = false;
  currentParentId: string | null = null;

  constructor(
    private mockDataService: MockDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadParents();
    this.initForm();
  }

  loadParents() {
    this.parents = this.mockDataService.getParents();
    this.filterParents();
  }

  initForm() {
    this.parentForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      profession: [''],
      adresse: [''],
      statut: ['actif'] 
    });
  }

  openModal(parent?: Parent) {
    this.isEditing = !!parent;
    this.currentParentId = parent ? parent.id : null;
    
    if (parent) {
      this.parentForm.patchValue({
        prenom: parent.prenom,
        nom: parent.nom,
        email: parent.email,
        telephone: parent.telephone,
        profession: parent.profession,
        adresse: parent.adresse,
        statut: parent.statut
      });
    } else {
      this.parentForm.reset({ statut: 'actif' });
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.parentForm.reset();
    this.currentParentId = null;
    this.isEditing = false;
  }

  onSubmit() {
    if (this.parentForm.invalid) return;

    const formData = this.parentForm.value;
    
    if (this.isEditing && this.currentParentId) {
      // Update logic (Mock)
      const index = this.parents.findIndex(p => p.id === this.currentParentId);
      if (index !== -1) {
        this.parents[index] = { ...this.parents[index], ...formData };
      }
    } else {
      // Add logic (Mock)
      const newParent: Parent = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        enfantIds: []
      };
      this.parents.push(newParent);
    }
    
    this.filterParents();
    this.closeModal();
  }

  toggleStatus(parent: Parent) {
    parent.statut = parent.statut === 'actif' ? 'inactif' : 'actif';
  }

  filterParents() {
    if (!this.searchQuery) {
      this.filteredParents = [...this.parents];
    } else {
      const search = this.searchQuery.toLowerCase();
      this.filteredParents = this.parents.filter(p => 
        p.nom.toLowerCase().includes(search) ||
        p.prenom.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search)
      );
    }
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.filterParents();
  }
}
