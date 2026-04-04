import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.scss'
})
export class AnnonceComponent implements OnInit {
  annonces: Record<string, unknown>[] = [];

  constructor(private readonly annonceService: AnnonceService) {}

  ngOnInit(): void {
    this.annonceService.listAnnonces().subscribe((response) => {
      this.annonces = response.content ?? [];
    });
  }
}
