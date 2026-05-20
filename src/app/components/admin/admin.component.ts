import { Component, OnInit } from '@angular/core';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';
import { CycleService } from '../../services/cycle.service';
import { NiveauService } from '../../services/niveau.service';
import { MatiereService } from '../../services/matiere.service';
import { BatimentService } from '../../services/batiment.service';
import { SalleService } from '../../services/salle.service';
import { AlertService } from '../../services/alert.service';

type Tab = 'annee-academique' | 'cycles' | 'niveaux' | 'matieres' | 'batiments' | 'salles';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  activeTab: Tab = 'annee-academique';
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Années académiques
  annees: any[] = [];
  newAnnee = { libelle: '', dateDebut: '', dateFin: '', setAsCurrent: true };

  // Cycles
  cycles: any[] = [];

  showCycleModal = false;

  editingCycleId: string | null = null;

  cycleForm = {
    code: '',
    libelle: '',
    actif: true
  };

  // Niveaux
  niveaux: any[] = [];
  showNiveauModal = false;
  editingNiveauId: string | null = null;
  niveauForm = {
    code: '',
    libelle: '',
    cycleId: '',
    ordre: 1,
    actif: true
  };

  // Matières
  matieres: any[] = [];

  showMatiereModal = false;

  editingMatiereId: string | null = null;

  matiereForm = {
    nom: '',
    code: '',
    description: '',
    coefficient: 1,
    categorie: ''
  };

  // Bâtiments
  batiments: any[] = [];
  showBatimentModal = false;
  editingBatimentId: string | null = null;
  batimentForm = { nom: '', adresse: '', description: '' };

  // Salles
  salles: any[] = [];
  showSalleModal = false;
  editingSalleId: string | null = null;
  salleForm = { nom: '', capacite: '', batimentId: '', type: '' };
  salleTypes = ['CLASSE', 'LABORATOIRE', 'BIBLIOTHEQUE', 'SALLE_INFO', 'GYMNASE', 'AUTRE'];

  constructor(
    private readonly anneeService: AnneeAcademiqueService,
    private readonly cycleService: CycleService,
    private readonly niveauService: NiveauService,
    private readonly matiereService: MatiereService,
    private readonly batimentService: BatimentService,
    private readonly salleService: SalleService,
    private readonly alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadAnnees();
    this.loadCycles();

    this.loadNiveaux();
  }

  setTab(tab: Tab): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
    switch (tab) {
      case 'annee-academique': this.loadAnnees(); break;
      case 'cycles': this.loadCycles(); break;
      case 'niveaux': this.loadNiveaux(); break;
      case 'matieres': this.loadMatieres(); break;
      case 'batiments': this.loadBatiments(); break;
      case 'salles': this.loadSalles(); break;
    }
  }

  // ─── Années Académiques ───────────────────────────────────────────────────

  loadAnnees(): void {
    this.loading = true;
    this.anneeService.listAnnees(0, 100).subscribe({
      next: (r) => {
        const rows = Array.isArray(r) ? r : (r as any)?.content ?? [];
        this.annees = rows.sort((a: any, b: any) => String(b?.libelle ?? '').localeCompare(String(a?.libelle ?? '')));
        this.loading = false;
      },
      error: () => { this.errorMessage = 'Impossible de charger les années.'; this.loading = false; }
    });
  }

  createAnnee(): void {
    this.successMessage = ''; this.errorMessage = '';
    if (!this.newAnnee.libelle || !this.newAnnee.dateDebut || !this.newAnnee.dateFin) {
      this.errorMessage = 'Tous les champs sont obligatoires.';
      this.alertService.warning('Champs requis', this.errorMessage);
      return;
    }
    this.anneeService.createAnnee({ libelle: this.newAnnee.libelle, dateDebut: this.newAnnee.dateDebut, dateFin: this.newAnnee.dateFin, estCourante: false, actif: true }).subscribe({
      next: (created) => {
        const id = String((created as any)?.id ?? '');
        if (this.newAnnee.setAsCurrent && id) {
          this.anneeService.activerAnnee(id).subscribe({
            next: () => { this.successMessage = 'Année créée et activée.'; this.newAnnee = { libelle: '', dateDebut: '', dateFin: '', setAsCurrent: true }; this.loadAnnees(); },
            error: () => { this.errorMessage = 'Année créée, activation impossible.'; this.loadAnnees(); }
          });
        } else {
          this.successMessage = 'Année académique créée.';
          this.newAnnee = { libelle: '', dateDebut: '', dateFin: '', setAsCurrent: true };
          this.loadAnnees();
        }
      },
      error: () => { this.errorMessage = 'Création échouée.'; }
    });
  }

  activerAnnee(id: string): void {
    this.anneeService.activerAnnee(id).subscribe({
      next: () => { this.successMessage = 'Année activée.'; this.loadAnnees(); },
      error: () => { this.errorMessage = 'Activation impossible.'; }
    });
  }

  // ─── Cycles ───────────────────────────────────────────────────────────────

  loadCycles(): void {
    this.loading = true;

    this.cycleService.list().subscribe({
      next: (data) => {
        this.cycles = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les cycles.';
        this.loading = false;
      }
    });
  }

  openCycleModal(cycle?: any): void {

    this.editingCycleId = cycle?.id ?? null;

    this.cycleForm = {
      code: cycle?.code ?? '',
      libelle: cycle?.libelle ?? '',
      actif: cycle?.actif ?? true
    };

    this.showCycleModal = true;
  }


  saveCycle(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.cycleForm.libelle) {
      this.errorMessage = 'Le libellé est obligatoire.';
      return;
    }

    if (!this.cycleForm.code) {
      this.errorMessage = 'Le code est obligatoire.';
      return;
    }

    const dto: Record<string, unknown> = {
      code: this.cycleForm.code,
      libelle: this.cycleForm.libelle,
      actif: this.cycleForm.actif
    };

    const obs = this.editingCycleId
      ? this.cycleService.update(this.editingCycleId, dto)
      : this.cycleService.create(dto);

    obs.subscribe({
      next: () => {

        this.successMessage = this.editingCycleId
          ? 'Cycle modifié.'
          : 'Cycle créé.';

        this.showCycleModal = false;

        this.loadCycles();
      },

      error: () => {
        this.errorMessage = 'Opération impossible.';
      }
    });
  }

  deleteCycle(id: string): void {

    if (!confirm('Supprimer ce cycle ?')) return;

    this.cycleService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Cycle supprimé.';
        this.loadCycles();
      },
      error: () => {
        this.errorMessage = 'Suppression impossible.';
      }
    });
  }

  // ─── Niveaux ──────────────────────────────────────────────────────────────

  loadNiveaux(): void {
    this.loading = true;
    this.niveauService.list().subscribe({
      next: (data) => { this.niveaux = Array.isArray(data) ? data : []; this.loading = false; },
      error: () => { this.errorMessage = 'Impossible de charger les niveaux.'; this.loading = false; }
    });
  }

  openNiveauModal(niveau?: any): void {

    if (!this.cycles.length) this.loadCycles();

    this.editingNiveauId = niveau?.id ?? null;

    this.niveauForm = {
      code: niveau?.code ?? '',
      libelle: niveau?.libelle ?? '',
      cycleId: niveau?.cycleId ?? '',
      ordre: niveau?.ordre ?? 1,
      actif: niveau?.actif ?? true
    };

    this.showNiveauModal = true;
  }

  saveNiveau(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.niveauForm.libelle || !this.niveauForm.cycleId) {
      this.errorMessage = 'Libellé et cycle sont obligatoires.';
      return;
    }

    const dto = {
      code: this.niveauForm.libelle, // ⚠️ important (ou généré)
      libelle: this.niveauForm.libelle,
      cycleId: this.niveauForm.cycleId,
      ordre: this.niveauForm.ordre,
      actif: true
    };

    const obs = this.editingNiveauId
      ? this.niveauService.update(this.editingNiveauId, dto)
      : this.niveauService.create(dto);

    obs.subscribe({
      next: () => {
        this.successMessage = this.editingNiveauId ? 'Niveau modifié.' : 'Niveau créé.';
        this.showNiveauModal = false;
        this.loadNiveaux();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Erreur création niveau.';
      }
    });
  }

  getCycleNom(cycleId: string): string {

    if (!this.cycles || !this.cycles.length) {
      return '-';
    }

    const cycle = this.cycles.find(c => c.id === cycleId);

    return cycle ? cycle.libelle : cycleId;
  }

  deleteNiveau(id: string): void {
    if (!confirm('Supprimer ce niveau ?')) return;
    this.niveauService.delete(id).subscribe({
      next: () => { this.successMessage = 'Niveau supprimé.'; this.loadNiveaux(); },
      error: () => { this.errorMessage = 'Suppression impossible.'; }
    });
  }

  closeNiveauModal(): void {

    this.showNiveauModal = false;
    this.editingNiveauId = null;

    this.niveauForm = {
      code: '',
      libelle: '',
      cycleId: '',
      ordre: 1,
      actif: true
    };
  }



  // ─── Matières ─────────────────────────────────────────────────────────────


  // ================= LOAD =================

  loadMatieres(): void {

    this.loading = true;

    this.matiereService.listMatieres(0, 200).subscribe({

      next: (res: any) => {

        this.matieres = res?.content ?? res ?? [];

        this.loading = false;
      },

      error: () => {

        this.errorMessage = 'Impossible de charger les matières.';

        this.loading = false;
      }
    });
  }


  // ================= MODAL =================

  openMatiereModal(m?: any): void {

    this.editingMatiereId = m?.id ?? null;

    this.matiereForm = {
      nom: m?.nom ?? '',
      code: m?.code ?? '',
      description: m?.description ?? '',
      coefficient: m?.coefficient ?? 1,
      categorie: m?.categorie ?? ''
    };

    this.showMatiereModal = true;
  }


  closeMatiereModal(): void {

    this.showMatiereModal = false;

    this.editingMatiereId = null;

    this.matiereForm = {
      nom: '',
      code: '',
      description: '',
      coefficient: 1,
      categorie: ''
    };
  }


  // ================= SAVE =================

  saveMatiere(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (!this.matiereForm.nom) {

      this.errorMessage = 'Le nom est obligatoire.';

      return;
    }

    if (!this.matiereForm.code) {

      this.errorMessage = 'Le code est obligatoire.';

      return;
    }

    const dto = {

      nom: this.matiereForm.nom,

      code: this.matiereForm.code,

      description: this.matiereForm.description,

      coefficient: this.matiereForm.coefficient,

      categorie: this.matiereForm.categorie
    };

    const obs = this.editingMatiereId
      ? this.matiereService.updateMatiere(this.editingMatiereId, dto)
      : this.matiereService.createMatiere(dto);

    obs.subscribe({

      next: () => {

        this.successMessage = this.editingMatiereId
          ? 'Matière modifiée.'
          : 'Matière créée.';

        this.showMatiereModal = false;

        this.loadMatieres();
      },

      error: (err) => {

        console.log(err);

        this.errorMessage = 'Erreur lors de la création.';
      }
    });
  }


  // ================= DELETE =================

  deleteMatiere(id: string): void {

    if (!confirm('Supprimer cette matière ?')) {
      return;
    }

    this.matiereService.deleteMatiere(id).subscribe({

      next: () => {

        this.successMessage = 'Matière supprimée.';

        this.loadMatieres();
      },

      error: () => {

        this.errorMessage = 'Suppression impossible.';
      }
    });
  }



  // ─── Bâtiments ────────────────────────────────────────────────────────────

  loadBatiments(): void {
    this.loading = true;
    this.batimentService.list().subscribe({
      next: (data) => { this.batiments = Array.isArray(data) ? data : []; this.loading = false; },
      error: () => { this.errorMessage = 'Impossible de charger les bâtiments.'; this.loading = false; }
    });
  }

  openBatimentModal(b?: any): void {
    this.editingBatimentId = b?.id ?? null;
    this.batimentForm = { nom: b?.nom ?? '', adresse: b?.adresse ?? '', description: b?.description ?? '' };
    this.showBatimentModal = true;
  }

  saveBatiment(): void {
    this.successMessage = ''; this.errorMessage = '';
    if (!this.batimentForm.nom) { this.errorMessage = 'Le nom est obligatoire.'; return; }
    const dto: Record<string, unknown> = { ...this.batimentForm };
    const obs = this.editingBatimentId
      ? this.batimentService.update(this.editingBatimentId, dto)
      : this.batimentService.create(dto);
    obs.subscribe({
      next: () => { this.successMessage = this.editingBatimentId ? 'Bâtiment modifié.' : 'Bâtiment créé.'; this.showBatimentModal = false; this.loadBatiments(); },
      error: () => { this.errorMessage = 'Opération impossible.'; }
    });
  }

  deleteBatiment(id: string): void {
    if (!confirm('Supprimer ce bâtiment ?')) return;
    this.batimentService.delete(id).subscribe({
      next: () => { this.successMessage = 'Bâtiment supprimé.'; this.loadBatiments(); },
      error: () => { this.errorMessage = 'Suppression impossible.'; }
    });
  }

  // ─── Salles ───────────────────────────────────────────────────────────────

  loadSalles(): void {
    this.loading = true;
    if (!this.batiments.length) this.loadBatiments();
    this.salleService.list().subscribe({
      next: (data) => { this.salles = Array.isArray(data) ? data : []; this.loading = false; },
      error: () => { this.errorMessage = 'Impossible de charger les salles.'; this.loading = false; }
    });
  }

  openSalleModal(s?: any): void {
    if (!this.batiments.length) this.loadBatiments();
    this.editingSalleId = s?.id ?? null;
    this.salleForm = { nom: s?.nom ?? '', capacite: s?.capacite ?? '', batimentId: s?.batimentId ?? '', type: s?.type ?? '' };
    this.showSalleModal = true;
  }

  saveSalle(): void {
    this.successMessage = ''; this.errorMessage = '';
    if (!this.salleForm.nom || !this.salleForm.batimentId) { this.errorMessage = 'Nom et bâtiment sont obligatoires.'; return; }
    const dto: Record<string, unknown> = { ...this.salleForm };
    const obs = this.editingSalleId
      ? this.salleService.update(this.editingSalleId, dto)
      : this.salleService.create(dto);
    obs.subscribe({
      next: () => { this.successMessage = this.editingSalleId ? 'Salle modifiée.' : 'Salle créée.'; this.showSalleModal = false; this.loadSalles(); },
      error: () => { this.errorMessage = 'Opération impossible.'; }
    });
  }

  deleteSalle(id: string): void {
    if (!confirm('Supprimer cette salle ?')) return;
    this.salleService.delete(id).subscribe({
      next: () => { this.successMessage = 'Salle supprimée.'; this.loadSalles(); },
      error: () => { this.errorMessage = 'Suppression impossible.'; }
    });
  }

  getBatimentNom(batimentId: string): string {
    const b = this.batiments.find((x: any) => x.id === batimentId);
    return b ? b.nom : batimentId;
  }
}
