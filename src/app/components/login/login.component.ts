import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertCircle, ArrowLeft, Lock, LucideIconData, Mail } from 'lucide-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  mailIcon: LucideIconData = Mail;
  lockIcon: LucideIconData = Lock;
  alertIcon: LucideIconData = AlertCircle;
  arrowLeftIcon: LucideIconData = ArrowLeft;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.errorMsg = '';
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (me) => {
        this.isLoading = false;
        this.authService.redirectToRoleDashboard(me.role);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = error?.error?.message ?? 'Identifiants invalides.';
      }
    });
  }
}
