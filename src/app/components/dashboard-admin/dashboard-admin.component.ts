import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { Building2, ChartColumn, GraduationCap, LucideIconData, Users } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  statistiques: any = {};
  ecoleInfo: any = {};

  graduationIcon: LucideIconData = GraduationCap;
  usersIcon: LucideIconData = Users;
  buildingIcon: LucideIconData = Building2;
  chartIcon: LucideIconData = ChartColumn;

  constructor(
    private readonly adminService: AdminService,
    private readonly anneeService: AnneeAcademiqueService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.statistiques = s);
    this.anneeService.getCourante().subscribe(a => this.ecoleInfo = a);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
