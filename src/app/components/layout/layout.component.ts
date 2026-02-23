import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from '../../models/user';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  roles: string[];
  badge?: number;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  currentRoute = '';
  openSubmenus = new Set<string>();

  menuItems: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupMenuItems();
    this.trackCurrentRoute();
  }

  private setupMenuItems(): void {
    if (!this.user) return;

    const allMenuItems: MenuItem[] = [
      {
        label: 'Tableau de Bord',
        icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
        route: this.getDashboardRoute(),
        roles: ['administrateur', 'enseignant', 'parent', 'eleve']
      },

      // Menu Administrateur
      {
        label: 'Gestion des Élèves',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.5a6 6 0 11-12 0 6 6 0 0112 0z',
        route: '/admin/eleves',
        roles: ['administrateur']
      },
      {
        label: 'Gestion des Enseignants',
        icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        route: '/admin/enseignants',
        roles: ['administrateur']
      },
      {
        label: 'Gestion des Classes',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11',
        route: '/admin/classes',
        roles: ['administrateur']
      },
      {
        label: 'Gestion des Matières',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        route: '/admin/matieres',
        roles: ['administrateur']
      },
      {
        label: 'Gestion des Parents',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        route: '/admin/parents',
        roles: ['administrateur']
      },
      {
        label: 'Gestion de la Caisse',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
        route: '/admin/caisse',
        roles: ['administrateur']
      },

      // Menu Enseignant
      {
        label: 'Mes Classes',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v11',
        route: '/enseignant/mes-classes',
        roles: ['enseignant']
      },
      {
        label: 'Saisir des Notes',
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        route: '/enseignant/saisir-notes',
        roles: ['enseignant']
      },

      // Menu commun
      {
        label: 'Bulletins de Notes',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        route: '/bulletins',
        roles: ['administrateur', 'enseignant', 'parent', 'eleve']
      },
      {
        label: 'Consultation des Notes',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        route: '/notes',
        roles: ['administrateur', 'enseignant', 'parent', 'eleve']
      },
      {
        label: 'Paiements',
        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
        route: '/paiements',
        roles: ['administrateur', 'parent'],
        badge: this.user?.type === 'parent' ? 2 : undefined
      }
    ];

    // Filtrer selon le rôle de l'utilisateur
    this.menuItems = allMenuItems.filter(item =>
      item.roles.includes(this.user!.type)
    );
  }

  private trackCurrentRoute(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.url;
    // });
  }

  private getDashboardRoute(): string {
    switch (this.user?.type) {
      case 'administrateur': return '/dashboard/admin';
      case 'enseignant': return '/dashboard/enseignant';
      case 'parent':
      case 'eleve': return '/dashboard/parent-eleve';
      default: return '/dashboard/admin';
    }
  }

  toggleSubmenu(label: string): void {
    if (this.openSubmenus.has(label)) {
      this.openSubmenus.delete(label);
    } else {
      this.openSubmenus.add(label);
    }
  }

  navigateToRoute(route: string | undefined): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  isActiveRoute(route: string | undefined): boolean {
    if (!route) return false;
    return this.currentRoute.startsWith(route);
  }

  getUserInitials(): string {
    if (!this.user) return 'U';
    return `${this.user.prenom.charAt(0)}${this.user.nom.charAt(0)}`.toUpperCase();
  }

  getUserTypeLabel(): string {
    switch (this.user?.type) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'parent': return 'Parent';
      case 'eleve': return 'Élève';
      default: return 'Utilisateur';
    }
  }

  getCurrentPageTitle(): string {
    const route = this.currentRoute;

    if (route.includes('dashboard')) {
      return 'Tableau de Bord';
    } else if (route.includes('eleves')) {
      return 'Gestion des Élèves';
    } else if (route.includes('enseignants')) {
      return 'Gestion des Enseignants';
    } else if (route.includes('classes')) {
      return 'Gestion des Classes';
    } else if (route.includes('matieres')) {
      return 'Gestion des Matières';
    } else if (route.includes('parents')) {
      return 'Gestion des Parents';
    } else if (route.includes('caisse')) {
      return 'Gestion de la Caisse';
    } else if (route.includes('mes-classes')) {
      return 'Mes Classes';
    } else if (route.includes('saisir-notes')) {
      return 'Saisir des Notes';
    } else if (route.includes('bulletins')) {
      return 'Bulletins de Notes';
    } else if (route.includes('notes')) {
      return 'Consultation des Notes';
    } else if (route.includes('paiements')) {
      return 'Paiements';
    } else if (route.includes('profil')) {
      return 'Mon Profil';
    }

    return 'École NOURA';
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onLogout(): void {
    this.logout.emit();
  }

}
