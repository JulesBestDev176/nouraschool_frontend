import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  exampleUsers = [
    { role: 'Admin', email: 'admin@noura.mr', password: 'admin123', icon: 'shield', type: 'administrateur', prenom: 'Admin', nom: 'System' },
    { role: 'Comptable', email: 'compta@noura.mr', password: 'compta123', icon: 'banknote', type: 'comptable', prenom: 'Mariem', nom: 'Dia' },
    { role: 'Surveillant', email: 'surveillant@noura.mr', password: 'surv123', icon: 'eye', type: 'surveillant', prenom: 'Moussa', nom: 'Sow' },
    { role: 'Assistants du surveillant', email: 'assistant@noura.mr', password: 'asst123', icon: 'users', type: 'assistant', prenom: 'Fatou', nom: 'Ba' }
  ];

  errorMsg = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  fillForm(user: any, emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    emailInput.value = user.email;
    passwordInput.value = user.password;
    this.errorMsg = '';
  }

  onSubmit(email: string, password: string) {
    const user = this.exampleUsers.find(u => u.email === email && u.password === password);

    if (user) {
      this.authService.login(user);
      // Redirection selon le rôle
      if (user.type === 'administrateur' || user.type === 'comptable' || user.type === 'surveillant' || user.type === 'assistant') {
        this.router.navigate(['/dashboard/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorMsg = 'Email ou mot de passe incorrect (utilisez les exemples ci-dessous)';
    }
  }
}
