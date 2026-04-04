import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  ecoleInfo: any = {};
  developpeurInfo: any = {
    nom: 'Noura School Team',
    fonction: 'Plateforme de gestion scolaire'
  };

  constructor(
    private router: Router,
    private anneeService: AnneeAcademiqueService
  ) {
    this.anneeService.getCourante().subscribe((annee) => {
      this.ecoleInfo = annee;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  goToAdminDashboard(): void {
    this.router.navigate(['/dashboard/admin']);
  }
}
