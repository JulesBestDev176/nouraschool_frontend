import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
statistiques: any = {};
  ecoleInfo = this.mockDataService.getEcoleInfo();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.loadStatistiques();
  }

  private loadStatistiques(): void {
    const eleves = this.mockDataService.getEleves();
    const enseignants = this.mockDataService.getEnseignants();
    const classes = this.mockDataService.getClasses();
    const paiements = this.mockDataService.getPaiements();

    this.statistiques = {
      totalEleves: eleves.length,
      totalEnseignants: enseignants.length,
      totalClasses: classes.length,
      elevesActifs: eleves.filter(e => e.statut === 'actif').length,
      enseignantsActifs: enseignants.filter(e => e.statut === 'actif').length,
      moyenneGeneraleEcole: eleves.reduce((acc, eleve) => acc + (eleve.moyenneAnnuelle || 0), 0) / eleves.length,
      totalMontantPaye: paiements.filter(p => p.statut === 'paye').reduce((acc, p) => acc + p.montant, 0),
      totalMontantEnAttente: paiements.filter(p => p.statut === 'en_attente').reduce((acc, p) => acc + p.montant, 0),
      paiementsEnAttente: paiements.filter(p => p.statut === 'en_attente').length
    };
  }

}
