import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classe.service';
import { Classe } from '../../models/classe';
import { AnneeAcademiqueService } from '../../services/annee-academique.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {

  currentYear = 'N/A';
  showInactive = false;
  searchQuery = '';
  selectedNiveau = '';

  classes: Array<Classe & { annee: string; effectif: string; responsable: string; status: 'Active' | 'Inactive' }> = [];

  constructor(
    private readonly classeService: ClasseService,
    private readonly anneeService: AnneeAcademiqueService
  ) {}

  ngOnInit() {
    this.anneeService.getCourante().subscribe((annee) => {
      this.currentYear = String(annee['libelle'] ?? annee['annee'] ?? 'N/A');
    });
    this.classeService.listClasses().subscribe((response) => {
      this.classes = (response.content ?? []).map((classe) => {
        const current = classe.elevesIds?.length ?? 0;
        const max = classe.nombreMaxEleves ?? 0;
        return {
          ...classe,
          annee: this.currentYear,
          effectif: `${current}/${max}`,
          responsable: classe.enseignantPrincipalId ?? 'N/A',
          status: 'Active'
        };
      });
    });
  }

  get filteredClasses() {
    return this.classes.filter(c => {
      const isCurrentYear = c.annee === this.currentYear;
      const matchStatus = this.showInactive ? !isCurrentYear : isCurrentYear;
      
      const matchSearch = c.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          c.niveau.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchNiveau = !this.selectedNiveau || c.niveau === this.selectedNiveau;
      
      return matchStatus && matchSearch && matchNiveau;
    });
  }

  calculatePercentage(effectif: string): number {
    const [current, max] = effectif.split('/').map(Number);
    if (!max) return 0;
    return (current / max) * 100;
  }

}
