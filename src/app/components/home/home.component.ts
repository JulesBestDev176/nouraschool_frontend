import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import {
  BookOpen, Building2, Globe, GraduationCap,
  Heart, Lightbulb, LucideIconData, Mail, School, Settings, Users
} from 'lucide-angular';

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

  graduationIcon: LucideIconData = GraduationCap;
  usersIcon: LucideIconData = Users;
  buildingIcon: LucideIconData = Building2;
  lightbulbIcon: LucideIconData = Lightbulb;
  bookIcon: LucideIconData = BookOpen;
  globeIcon: LucideIconData = Globe;
  settingsIcon: LucideIconData = Settings;
  schoolIcon: LucideIconData = School;
  heartIcon: LucideIconData = Heart;
  mailIcon: LucideIconData = Mail;

  constructor(private router: Router, private anneeService: AnneeAcademiqueService) {
    this.anneeService.getCourante().subscribe((annee) => {
      this.ecoleInfo = annee;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
