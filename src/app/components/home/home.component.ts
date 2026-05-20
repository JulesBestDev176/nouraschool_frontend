import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { AnneeAcademique } from '../../models/annee-academique';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  ecoleInfo: Partial<AnneeAcademique> & {
    slogan?: string;
    directeur?: string;
    directeurPedagogique?: string;
    telephone?: string;
    email?: string;
    adresse?: string;
    anneeAcademique?: string;
  } = {
    slogan: 'Former les leaders de demain',
    telephone: '+222 45 67 89 01',
    email: 'contact@ecole-noura.mr',
    adresse: 'Nouakchott, Mauritanie',
    anneeAcademique: '2024-2025',
  };

  constructor(
    private router: Router,
    private anneeService: AnneeAcademiqueService
  ) {
    this.anneeService.getCourante().pipe(
      catchError(() => of({} as AnneeAcademique))
    ).subscribe((annee) => {
      this.ecoleInfo = { ...this.ecoleInfo, ...annee };
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
