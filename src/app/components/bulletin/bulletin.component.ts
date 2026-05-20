import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BulletinService } from '../../services/bulletin.service';
import { Bulletin } from '../../models/bulletin';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrl: './bulletin.component.scss'
})
export class BulletinComponent implements OnInit {
  bulletins: Bulletin[] = [];
  isGenerateModalOpen = false;
  eleveIdToGenerate = '';
  generatedLink = '';
  generateError = '';
  isGenerating = false;

  constructor(
    private readonly bulletinService: BulletinService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.bulletinService.listBulletins().subscribe((bulletins) => {
      this.bulletins = bulletins;
    });
    this.handleQuickAction();
  }

  openGenerateModal(): void {
    this.eleveIdToGenerate = '';
    this.generatedLink = '';
    this.generateError = '';
    this.isGenerateModalOpen = true;
  }

  closeGenerateModal(): void {
    this.isGenerateModalOpen = false;
    this.eleveIdToGenerate = '';
    this.generatedLink = '';
    this.generateError = '';
    this.isGenerating = false;
  }

  generateBulletinLink(): void {
    const eleveId = this.eleveIdToGenerate.trim();

    if (!eleveId) {
      this.generateError = 'Veuillez saisir l identifiant de l eleve.';
      return;
    }

    this.isGenerating = true;
    this.generatedLink = '';
    this.generateError = '';

    this.bulletinService.genererLienBulletinEleve(eleveId).subscribe({
      next: (response) => {
        this.generatedLink = response.url || response.token;
        this.isGenerating = false;
      },
      error: () => {
        this.generateError = 'Impossible de generer le lien du bulletin.';
        this.isGenerating = false;
      }
    });
  }

  private handleQuickAction(): void {
    if (this.route.snapshot.queryParamMap.get('action') === 'create') {
      this.openGenerateModal();
      this.clearQuickActionParam();
    }
  }

  private clearQuickActionParam(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

}
