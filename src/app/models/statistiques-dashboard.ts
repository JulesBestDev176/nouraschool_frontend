// Interfaces pour les statistiques
export interface StatistiquesDashboard {
  totalEleves: number;
  totalEnseignants: number;
  totalClasses: number;
  moyenneGenerale: number;
  elevesPresents?: number;
  paiementsEnAttente?: number;
  notesAjoutees?: number;
}