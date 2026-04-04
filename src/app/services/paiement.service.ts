import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement';
import { CaisseService } from './caisse.service';
import { PageResponse } from '../core/models/page.models';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  constructor(private readonly caisseService: CaisseService) {}

  listPaiements(page = 0, size = 20): Observable<PageResponse<Paiement>> {
    return this.caisseService.listPaiements(page, size);
  }

  getPaiement(id: string): Observable<Paiement> {
    return this.caisseService.getPaiement(id);
  }
}
