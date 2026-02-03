import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {

  currentYear = '2025-2026';
  showInactive = false;
  searchQuery = '';
  selectedNiveau = '';

  classes = [
    { id: 1, nom: '2nd A', niveau: 'Lycée', annee: '2025-2026', effectif: '15/30', responsable: 'Jean Martin', status: 'Active' },
    { id: 2, nom: 'CM1 B', niveau: 'Primaire', annee: '2025-2026', effectif: '22/25', responsable: 'Aminata Sow', status: 'Active' },
    { id: 3, nom: '2nd A', niveau: 'Lycée', annee: '2024-2025', effectif: '28/30', responsable: 'Moussa Diallo', status: 'Inactive' },
    { id: 4, nom: '3ème C', niveau: 'Collège', annee: '2025-2026', effectif: '18/20', responsable: 'Sidi Ali', status: 'Active' },
    { id: 5, nom: 'CM2 A', niveau: 'Primaire', annee: '2023-2024', effectif: '25/25', responsable: 'Fatma Ba', status: 'Inactive' },
  ];

  ngOnInit() {}

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
