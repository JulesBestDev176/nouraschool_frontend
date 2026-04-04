import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMsg = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit(email: string, password: string) {
    this.errorMsg = '';
    this.isLoading = true;
    this.authService.login(email, password).subscribe({
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
