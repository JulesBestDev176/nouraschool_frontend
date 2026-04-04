import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulletinService } from '../../services/bulletin.service';

@Component({
  selector: 'app-bulletin-public',
  templateUrl: './bulletin-public.component.html',
  styleUrl: './bulletin-public.component.scss'
})
export class BulletinPublicComponent implements OnInit {
  token = '';
  otp = '';
  bulletin: unknown = null;
  error = '';

  constructor(private readonly route: ActivatedRoute, private readonly bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    if (this.token) {
      this.loadBulletin();
    }
  }

  loadBulletin(): void {
    this.bulletinService.consulterBulletinParToken(this.token).subscribe({
      next: (data) => {
        this.bulletin = data;
        this.error = '';
      },
      error: () => {
        this.error = 'Lien bulletin invalide ou expire.';
      }
    });
  }

  verifyOtp(): void {
    if (!this.otp) {
      return;
    }
    this.bulletinService.verifierOtpBulletin(this.token, this.otp).subscribe({
      next: (data) => {
        this.bulletin = data;
        this.error = '';
      },
      error: () => {
        this.error = 'OTP invalide.';
      }
    });
  }
}
