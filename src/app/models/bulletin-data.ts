import { Classe } from "./classe";
import { Eleve } from "./eleve";

export interface BulletinData {
  id: string;
  eleve: Eleve;
  classe?: Classe;
  trimestre: number;
  annee: string;
  moyenneGenerale: number;
  rang: number;
  totalEleves: number;
  statut: 'brouillon' | 'en_cours' | 'complet';
  hasNotes: boolean;
  dateGeneration?: Date;
}