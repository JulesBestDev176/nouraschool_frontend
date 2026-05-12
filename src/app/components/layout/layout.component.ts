import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  Ban,
  BookOpen,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleUserRound,
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  LucideIconData,
  Mail,
  Megaphone,
  MessageSquareWarning,
  NotebookPen,
  School,
  Settings,
  TriangleAlert,
  Users,
  UsersRound,
  Wallet
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { AuthMeDto } from '../../core/models/auth.models';

interface MenuItem {
  label: string;
  icon: LucideIconData;
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

  readonly profileIcon = CircleUserRound;
  readonly logoutIcon = LogOut;

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
      case 'SUPER_ADMIN':
        return '/dashboard/admin';
      case 'ENSEIGNANT':
        return '/dashboard/enseignant';
      case 'PARENT':
        return '/dashboard/parent';
      case 'ELEVE':
        return '/dashboard/eleve';
      case 'SURVEILLANT':
        return '/dashboard/surveillant';
      case 'CAISSIER':
        return '/dashboard/caisse';
      default:
        return '/dashboard/admin';
    }
  }

  private setupMenuItems(): void {
    const role = this.currentUser?.role ?? '';

    const allMenuItems: MenuItem[] = [
      {
        label: 'Tableau de Bord',
        icon: LayoutDashboard,
        route: this.getDashboard(),
        roles: ['ADMIN', 'SUPER_ADMIN', 'ENSEIGNANT', 'PARENT', 'ELEVE', 'SURVEILLANT', 'CAISSIER', 'RH']
      },
      {
        label: 'Élèves',
        icon: GraduationCap,
        route: '/admin/eleves',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Classes',
        icon: Building2,
        route: '/admin/classes',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Inscriptions',
        icon: ClipboardList,
        route: '/admin/inscriptions',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Parents',
        icon: Users,
        route: '/admin/parents',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Vie scolaire'
      },
      {
        label: 'Enseignants',
        icon: School,
        route: '/admin/enseignants',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Personnel',
        icon: UsersRound,
        route: '/admin/personnel',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Pointages',
        icon: Clock3,
        route: '/admin/pointages',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Absences Personnel',
        icon: Ban,
        route: '/admin/absences-personnel',
        roles: ['ADMIN', 'RH', 'SUPER_ADMIN'],
        section: 'Personnel'
      },
      {
        label: 'Cours',
        icon: BookOpen,
        route: '/admin/cours',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Emplois du Temps',
        icon: CalendarDays,
        route: '/admin/emplois-du-temps',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Notes',
        icon: ChartColumn,
        route: '/admin/notes',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Bulletins',
        icon: FileText,
        route: '/admin/bulletins',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Pédagogie'
      },
      {
        label: 'Absences Élèves',
        icon: TriangleAlert,
        route: '/surveillant/absences',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },
      {
        label: 'Convocations',
        icon: Mail,
        route: '/surveillant/convocations',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },
      {
        label: 'Réclamations',
        icon: MessageSquareWarning,
        route: '/admin/reclamations',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Discipline'
      },
      {
        label: 'Caisse',
        icon: Wallet,
        route: '/admin/caisse',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Finance'
      },
      {
        label: 'Paiements',
        icon: CreditCard,
        route: '/admin/paiements',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Finance'
      },
      {
        label: 'Annonces',
        icon: Megaphone,
        route: '/admin/annonces',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Communication'
      },
      {
        label: 'Paramètres',
        icon: Settings,
        route: '/admin/parametres',
        roles: ['ADMIN', 'SUPER_ADMIN'],
        section: 'Configuration'
      },
      {
        label: 'Mes Classes',
        icon: Building2,
        route: '/enseignant/mes-classes',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Saisir des Notes',
        icon: NotebookPen,
        route: '/enseignant/saisir-notes',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Bulletins',
        icon: FileText,
        route: '/admin/bulletins',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Emploi du Temps',
        icon: CalendarDays,
        route: '/admin/emplois-du-temps',
        roles: ['ENSEIGNANT']
      },
      {
        label: 'Absences',
        icon: TriangleAlert,
        route: '/surveillant/absences',
        roles: ['SURVEILLANT']
      },
      {
        label: 'Convocations',
        icon: Mail,
        route: '/surveillant/convocations',
        roles: ['SURVEILLANT']
      },
      {
        label: 'Caisse',
        icon: Wallet,
        route: '/dashboard/caisse',
        roles: ['CAISSIER']
      },
      {
        label: 'Paiements',
        icon: CreditCard,
        route: '/paiements',
        roles: ['CAISSIER']
      },
      {
        label: 'Bulletins',
        icon: FileText,
        route: '/admin/bulletins',
        roles: ['PARENT']
      },
      {
        label: 'Paiements',
        icon: CreditCard,
        route: '/paiements',
        roles: ['PARENT']
      },
      {
        label: 'Mes Notes',
        icon: ChartColumn,
        route: '/notes',
        roles: ['ELEVE']
      },
      {
        label: 'Mon Bulletin',
        icon: FileText,
        route: '/admin/bulletins',
        roles: ['ELEVE']
      }
    ];

    this.menuItems = allMenuItems.filter(item => item.roles.includes(role));
  }

  get adminSections(): string[] {
    const sections = new Set<string>();
    this.menuItems.forEach(item => {
      if (item.section) {
        sections.add(item.section);
      }
    });
    return Array.from(sections);
  }

  getItemsForSection(section: string): MenuItem[] {
    return this.menuItems.filter(item => item.section === section);
  }

  get topLevelItems(): MenuItem[] {
    return this.menuItems.filter(item => !item.section);
  }

  navigateToRoute(route: string | undefined): void {
    if (route) {
      this.router.navigate([route]);
    }
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
    if (!route) {
      return false;
    }
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  getUserInitials(): string {
    if (!this.currentUser) {
      return 'U';
    }
    return `${this.currentUser.prenom.charAt(0)}${this.currentUser.nom.charAt(0)}`.toUpperCase();
  }

  getUserTypeLabel(): string {
    switch (this.currentUser?.role) {
      case 'ADMIN':
        return 'Administrateur';
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ENSEIGNANT':
        return 'Enseignant';
      case 'PARENT':
        return 'Parent';
      case 'ELEVE':
        return 'Élève';
      case 'SURVEILLANT':
        return 'Surveillant';
      case 'CAISSIER':
        return 'Caissier';
      case 'RH':
        return 'Ressources Humaines';
      default:
        return 'Utilisateur';
    }
  }

  getCurrentPageTitle(): string {
    const found = this.menuItems.find(item => item.route && this.currentRoute.startsWith(item.route));
    if (found) {
      return found.label;
    }
    if (this.currentRoute.includes('dashboard')) {
      return 'Tableau de Bord';
    }
    if (this.currentRoute.includes('profil')) {
      return 'Mon Profil';
    }
    return 'Noura School';
  }

  onLogout(): void {
    this.authService.logout();
  }
}
