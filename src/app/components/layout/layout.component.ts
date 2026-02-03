import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { createIcons, icons } from 'lucide';

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
export class LayoutComponent implements OnInit, OnDestroy {

  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();

  currentRoute = '';
  openSubmenus = new Set<string>();
  
  menuItems: MenuItem[] = [];
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Si l'utilisateur n'est pas fourni en entrée, on le récupère du service
    if (!this.user) {
      this.authSubscription = this.authService.currentUser$.subscribe(user => {
        this.user = user;
        if (user) {
          this.setupMenuItems();
        }
      });
    } else {
      this.setupMenuItems();
    }
    this.trackCurrentRoute();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private setupMenuItems(): void {
    if (!this.user) return;

    const allMenuItems: MenuItem[] = [
      {
        label: 'Tableau de Bord',
        icon: 'layout-dashboard',
        route: this.getDashboardRoute(),
        roles: ['administrateur', 'enseignant', 'parent', 'eleve', 'comptable', 'surveillant', 'assistant']
      },
      
      // Menu Administrateur
      {
        label: 'Élèves',
        icon: 'users',
        route: '/admin/eleves',
        roles: ['administrateur', 'surveillant', 'assistant', 'comptable']
      },
      {
        label: 'Personnels',
        icon: 'user-check',
        route: '/admin/personnel',
        roles: ['administrateur', 'surveillant']
      },
      {
        label: 'Classes',
        icon: 'layers',
        route: '/admin/classes',
        roles: ['administrateur', 'surveillant', 'assistant']
      },
      {
        label: 'Matières',
        icon: 'book',
        route: '/admin/matieres',
        roles: ['administrateur']
      },
      {
        label: 'Parents',
        icon: 'heart',
        route: '/admin/parents',
        roles: ['administrateur', 'surveillant', 'comptable']
      },
      {
        label: 'Gestion de la Caisse',
        icon: 'wallet',
        route: '/admin/caisse',
        roles: ['comptable']
      },

      // Menu Enseignant
      {
        label: 'Mes Classes',
        icon: 'layers',
        route: '/enseignant/mes-classes',
        roles: ['enseignant']
      },
      {
        label: 'Saisir des Notes',
        icon: 'file-text',
        route: '/enseignant/saisir-notes',
        roles: ['enseignant']
      },

      // Menu commun
      {
        label: 'Bulletins de Notes',
        icon: 'file-text',
        route: '/bulletins',
        roles: ['enseignant', 'parent', 'eleve']
      },
      {
        label: 'Consultation des Notes',
        icon: 'clipboard-list',
        route: '/notes',
        roles: ['enseignant', 'parent', 'eleve']
      },
      {
        label: 'Paiements',
        icon: 'credit-card',
        route: '/paiements',
        roles: ['parent'],
        badge: this.user?.type === 'parent' ? 2 : undefined
      },
      {
        label: 'Profil',
        icon: 'user',
        route: '/admin/profil',
        roles: ['administrateur', 'enseignant', 'parent', 'eleve', 'comptable', 'surveillant', 'assistant']
      }
    ];

    // Filtrer selon le rôle de l'utilisateur
    this.menuItems = allMenuItems.filter(item => 
      item.roles.includes(this.user!.type)
    );

    setTimeout(() => createIcons({ icons }), 0);
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
      case 'comptable':
      case 'surveillant':
      case 'assistant':
        return '/dashboard/admin'; // On utilise le même pour la simulation
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
      case 'comptable': return 'Comptable';
      case 'surveillant': return 'Surveillant';
      case 'assistant': return 'Assistant Surveillant';
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
    } else if (route.includes('personnel')) {
      return 'Gestion du Personnel';
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
    this.authService.logout();
    this.router.navigate(['/login']);
    this.logout.emit();
  }

}
