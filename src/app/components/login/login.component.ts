import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface LoginSlide {
  icon: string;
  title: string;
  text: string;
  image: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMsg = '';
  isLoading = false;
  hidePassword = true;

  readonly loginForm = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });

  readonly slides: LoginSlide[] = [
    {
      icon: 'school',
      title: 'Une gestion scolaire centralisee',
      text: 'Suivez les eleves, les classes, les notes et les bulletins depuis un espace unique.',
      image: 'assets/images/eleves2.jpg',
    },
    {
      icon: 'groups',
      title: 'Chaque role a son espace',
      text: 'Administration, enseignants, parents et eleves accedent aux outils adaptes a leur quotidien.',
      image: 'assets/images/topImage.png',
    },
    {
      icon: 'verified',
      title: 'Donnees securisees',
      text: 'Authentification, roles et tenant protegent les informations de chaque etablissement.',
      image: 'assets/images/eleves.png',
    },
  ];

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { login, password } = this.loginForm.getRawValue();
    this.errorMsg = '';
    this.isLoading = true;
    this.authService.login(login, password).subscribe({
      next: (me) => {
        this.isLoading = false;
        this.authService.redirectToRoleDashboard(me.role);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = error?.error?.message ?? 'Identifiants invalides.';
      },
    });
  }
}
