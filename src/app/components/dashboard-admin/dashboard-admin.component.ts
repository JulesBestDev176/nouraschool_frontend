import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  statistiques: any = {};
  ecoleInfo: any = {};

  constructor(
    private readonly adminService: AdminService,
    private readonly anneeService: AnneeAcademiqueService
  ) {}

  ngOnInit(): void {
    this.loadStatistiques();
  }

  private loadStatistiques(): void {
    this.adminService.getStats().subscribe((stats) => {
      this.statistiques = stats;
    });
    this.anneeService.getCourante().subscribe((annee) => {
      this.ecoleInfo = annee;
    });
  }

}
