import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'noura_school_frontend';

   ecoleInfo = {
    logo: 'assets/images/logo.png',
    slogan: 'Former les leaders de demain',
    directeur: 'M. Ahmed',
    directeurPedagogique: 'Mme Fatima',
    telephone: '+222 45 67 89 01',
    email: 'contact@ecole-noura.mr',
    adresse: 'Nouakchott, Mauritanie',
    anneeAcademique: '2024-2025'
  };

  developpeurInfo = {
    nom: 'Ton Nom',
    fonction: 'Développeur Full Stack',
    telephone: '+222 33 44 55 66',
    whatsapp: '+222 33 44 55 66',
    email: 'dev@example.com',
    description: 'Développement de solutions numériques modernes.'
  };

  
  constructor(private router: Router) {}

  ngAfterViewInit() {
    createIcons({ icons });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => createIcons({ icons }), 0);
      }
    });
  }
}
