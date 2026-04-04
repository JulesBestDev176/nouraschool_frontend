import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  me: any = {};
  passwordForm: FormGroup;
  message = '';

  constructor(private readonly profilService: ProfilService, private readonly fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      ancienMotDePasse: ['', Validators.required],
      nouveauMotDePasse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.profilService.getMe().subscribe((me) => {
      this.me = me;
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      return;
    }
    this.profilService.changePassword(this.passwordForm.value).subscribe(() => {
      this.message = 'Mot de passe mis a jour.';
      this.passwordForm.reset();
    });
  }

}
