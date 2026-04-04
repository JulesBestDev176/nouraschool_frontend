import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.scss'
})
export class PaiementComponent implements OnInit {
  paiements: Paiement[] = [];

  constructor(private readonly paiementService: PaiementService) {}

  ngOnInit(): void {
    this.paiementService.listPaiements().subscribe((response) => {
      this.paiements = response.content ?? [];
    });
  }
}
