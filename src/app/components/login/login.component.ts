import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { AlertCircle, ArrowLeft, Lock, LucideIconData, Mail } from 'lucide-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  mailIcon: LucideIconData = Mail;
  lockIcon: LucideIconData = Lock;
  alertIcon: LucideIconData = AlertCircle;
  arrowLeftIcon: LucideIconData = ArrowLeft;

  constructor(
    private authService: AuthService,
    private alert: AlertService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.alert.warning('Champs requis', 'Veuillez renseigner votre email et mot de passe.');
      return;
    }

    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (me) => {
        this.isLoading = false;
        this.alert.toast('success', 'Connexion réussie');
        this.authService.redirectToRoleDashboard(me.role);
      },
      error: (error) => {
        this.isLoading = false;
        this.alert.error(
          'Échec de connexion',
          error?.error?.message ?? 'Identifiants invalides. Veuillez réessayer.'
        );
      }
    });
  }
}
