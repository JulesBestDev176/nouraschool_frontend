import { Component, OnInit } from '@angular/core';
import { CaisseService } from '../../services/caisse.service';
import { Paiement } from '../../models/paiement';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.scss'
})
export class CaisseComponent implements OnInit {

  isModalOpen = false;
  paiements: Paiement[] = [];

  constructor(private readonly caisseService: CaisseService) {}

  ngOnInit(): void {
    this.loadPaiements();
  }

  loadPaiements(): void {
    this.caisseService.listPaiements().subscribe((response) => {
      this.paiements = response.content ?? [];
    });
  }

  openModal() {
    this.isModalOpen = true;
  }


  closeModal() {
    this.isModalOpen = false;
  }

}
