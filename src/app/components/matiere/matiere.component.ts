import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../../services/matiere.service';
import { Matiere } from '../../models/matiere';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.scss'
})
export class MatiereComponent implements OnInit {
  matieres: Matiere[] = [];

  isModalOpen = false;

  constructor(private readonly matiereService: MatiereService) {}

  ngOnInit(): void {
    this.matiereService.listMatieres().subscribe((response) => {
      this.matieres = response.content ?? [];
    });
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

}
