import { AfterViewInit, Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { createIcons, icons } from 'lucide';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { asyncScheduler, distinctUntilChanged, observeOn } from 'rxjs';
import { appInitialized } from './store';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'noura_school_frontend';
  readonly loading$ = this.loadingService.loading$.pipe(
    distinctUntilChanged(),
    observeOn(asyncScheduler)
  );

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

  
  constructor(
    private router: Router,
    private translate: TranslateService,
    private store: Store,
    public loadingService: LoadingService,
  ) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setFallbackLang('fr');
    this.translate.use(this.resolveLanguage());
    this.store.dispatch(appInitialized());
  }

  ngAfterViewInit() {
    createIcons({ icons });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
        this.loadingService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof RouteConfigLoadEnd
      ) {
        this.loadingService.hide();
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => createIcons({ icons }), 0);
      }
    });
  }

  private resolveLanguage(): string {
    const browserLang = this.translate.getBrowserLang();
    return browserLang && ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
  }
}
