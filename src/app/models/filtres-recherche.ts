// Interfaces pour les filtres et recherches
export interface FiltresRecherche {
  terme?: string;
  statut?: string;
  classe?: string;
  matiere?: string;
  dateDebut?: Date;
  dateFin?: Date;
}