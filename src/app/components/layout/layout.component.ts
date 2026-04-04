import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthMeDto } from '../../core/models/auth.models';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  roles: string[];
  section?: string;
  badge?: number;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private static readonly SIDEBAR_SCROLL_KEY = 'noura.sidebar.scrollTop';

  @ViewChild('sidebarContainer') sidebarContainer?: ElementRef<HTMLElement>;

  currentUser: AuthMeDto | null = null;
  currentRoute = '';
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.setupMenuItems();
    this.currentRoute = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentRoute = (event as NavigationEnd).url;
      this.restoreSidebarScroll();
    });
  }

  ngAfterViewInit(): void {
    this.restoreSidebarScroll();
  }

  private getDashboard(): string {
    switch (this.currentUser?.role) {
      case 'ADMIN':
      case 'SUPER_ADMIN': return '/dashboard/admin';
      case 'ENSEIGNANT': return '/dashboard/enseignant';
      case 'PARENT': return '/dashboard/parent';
      case 'ELEVE': return '/dashboard/eleve';
      case 'SURVEILLANT': return '/dashboard/surveillant';
      case 'CAISSIER': return '/dashboard/caisse';
      default: return '/dashboard/admin';
    }
  }

  private setupMenuItems(): void {
    const role = this.currentUser?.role ?? '';

    const allMenuItems: MenuItem[] = [
      // ─ Tableau de bord ─
      {
        label: 'Tableau de Bord',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        route: this.getDashboard(),
        roles: ['ADMIN', 'SUPER_ADMIN', 'ENSEIGNANT', 'PARENT', 'ELEVE', 'SURVEILLANT', 'CAISSIER', 'RH']
      },

      // ─── ADMIN : Vie scolaire ─────────────────────────────────────────────
      {
        label: 'Élèves',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        route: '/admin/eleves',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Classes',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11',
        route: '/admin/classes',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Inscriptions',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        route: '/admin/inscriptions',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Parents',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        route: '/admin/parents',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },

      // ─── ADMIN : Personnel & RH ────────────────────────────────────────────
      {
        label: 'Enseignants',
        icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        route: '/admin/enseignants',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Personnel',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        route: '/admin/personnel',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Pointages',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        route: '/admin/pointages',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Absences Personnel',
        icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636',
        route: '/admin/absences-personnel',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },

      // ─── ADMIN : Pédagogie ─────────────────────────────────────────────────
      {
        label: 'Cours',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        route: '/admin/cours',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Emplois du Temps',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        route: '/admin/emplois-du-temps',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Notes',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        route: '/admin/notes',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Bulletins',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        route: '/admin/bulletins',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },

      // ─── ADMIN : Discipline ────────────────────────────────────────────────
      {
        label: 'Absences Élèves',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        route: '/surveillant/absences',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },
      {
        label: 'Convocations',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        route: '/surveillant/convocations',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },
      {
        label: 'Réclamations',
        icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
        route: '/admin/reclamations',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },

      // ─── ADMIN : Finance ───────────────────────────────────────────────────
      {
        label: 'Caisse',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
        route: '/admin/caisse',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Finance'
      },
      {
        label: 'Paiements',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
        route: '/admin/paiements',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Finance'
      },

      // ─── ADMIN : Communication ─────────────────────────────────────────────
      {
        label: 'Annonces',
        icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
        route: '/admin/annonces',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Communication'
      },

      // ─── ADMIN : Configuration ─────────────────────────────────────────────
      {
        label: 'Paramètres',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        route: '/admin/parametres',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Configuration'
      },

      // ─── ENSEIGNANT ────────────────────────────────────────────────────────
      {
        label: 'Mes Classes',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11',
        route: '/enseignant/mes-classes',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Saisir des Notes',
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        route: '/enseignant/saisir-notes',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Bulletins',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        route: '/admin/bulletins',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Emploi du Temps',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        route: '/admin/emplois-du-temps',
        roles: ['ENSEIGNANT']
      },

      // ─── SURVEILLANT ───────────────────────────────────────────────────────
      {
        label: 'Absences',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        route: '/surveillant/absences',
        roles: ['SURVEILLANT']
      },
      {
        label: 'Convocations',
        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        route: '/surveillant/convocations',
        roles: ['SURVEILLANT']
      },

      // ─── CAISSIER ──────────────────────────────────────────────────────────
      {
        label: 'Caisse',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
        route: '/dashboard/caisse',
        roles: ['CAISSIER']
      },
      {
        label: 'Paiements',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
        route: '/paiements',
        roles: ['CAISSIER']
      },

      // ─── PARENT ────────────────────────────────────────────────────────────
      {
        label: 'Bulletins',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        route: '/admin/bulletins',
        roles: ['PARENT']
      },
      {
        label: 'Paiements',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
        route: '/paiements',
        roles: ['PARENT']
      },

      // ─── ÉLÈVE ─────────────────────────────────────────────────────────────
      {
        label: 'Mes Notes',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        route: '/notes',
        roles: ['ELEVE']
      },
      {
        label: 'Mon Bulletin',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        route: '/admin/bulletins',
        roles: ['ELEVE']
      }
    ];

    this.menuItems = allMenuItems.filter(item => item.roles.includes(role));
  }

  get adminSections(): string[] {
    const sections = new Set<string>();
    this.menuItems.forEach(item => { if (item.section) sections.add(item.section); });
    return Array.from(sections);
  }

  getItemsForSection(section: string): MenuItem[] {
    return this.menuItems.filter(item => item.section === section);
  }

  get topLevelItems(): MenuItem[] {
    return this.menuItems.filter(item => !item.section);
  }

  navigateToRoute(route: string | undefined): void {
    if (route) this.router.navigate([route]);
  }

  onSidebarScroll(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    sessionStorage.setItem(LayoutComponent.SIDEBAR_SCROLL_KEY, String(target.scrollTop));
  }

  private restoreSidebarScroll(): void {
    const saved = sessionStorage.getItem(LayoutComponent.SIDEBAR_SCROLL_KEY);
    const container = this.sidebarContainer?.nativeElement;
    if (!container || saved == null) {
      return;
    }

    const scrollTop = Number(saved);
    if (!Number.isNaN(scrollTop)) {
      setTimeout(() => {
        container.scrollTop = scrollTop;
      }, 0);
    }
  }

  isActiveRoute(route: string | undefined): boolean {
    if (!route) return false;
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.prenom.charAt(0)}${this.currentUser.nom.charAt(0)}`.toUpperCase();
  }

  getUserTypeLabel(): string {
    switch (this.currentUser?.role) {
      case 'ADMIN': return 'Administrateur';
      case 'SUPER_ADMIN': return 'Super Admin';
      case 'ENSEIGNANT': return 'Enseignant';
      case 'PARENT': return 'Parent';
      case 'ELEVE': return 'Élève';
      case 'SURVEILLANT': return 'Surveillant';
      case 'CAISSIER': return 'Caissier';
      case 'RH': return 'Ressources Humaines';
      default: return 'Utilisateur';
    }
  }

  getCurrentPageTitle(): string {
    const found = this.menuItems.find(item => item.route && this.currentRoute.startsWith(item.route));
    if (found) return found.label;
    if (this.currentRoute.includes('dashboard')) return 'Tableau de Bord';
    if (this.currentRoute.includes('profil')) return 'Mon Profil';
    return 'Noura School';
  }

  onLogout(): void {
    this.authService.logout();
  }
}
