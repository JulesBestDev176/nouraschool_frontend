import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaisseService } from '../../services/caisse.service';

@Component({
  selector: 'app-paiement-public',
  templateUrl: './paiement-public.component.html',
  styleUrl: './paiement-public.component.scss'
})
export class PaiementPublicComponent implements OnInit {
  token = '';
  detail: Record<string, unknown> | null = null;
  error = '';

  constructor(private readonly route: ActivatedRoute, private readonly caisseService: CaisseService) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    if (this.token) {
      this.caisseService.detailLienPaiement(this.token).subscribe({
        next: (response) => {
          this.detail = response;
          this.error = '';
        },
        error: () => {
          this.error = 'Lien de paiement invalide ou expire.';
        }
      });
    }
  }

  payer(): void {
    if (!this.token) {
      return;
    }
    this.caisseService.payerParLien(this.token, {}).subscribe({
      next: (response) => {
        this.detail = response;
      },
      error: () => {
        this.error = 'Paiement impossible pour le moment.';
      }
    });
  }
}
