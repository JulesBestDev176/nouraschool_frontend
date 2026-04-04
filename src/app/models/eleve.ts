import { Note } from "./note";

export interface Eleve {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  dateNaissance: Date;
  adresse?: string;
  lieuNaissance?: string;
  sexe?: 'M' | 'F';
  cycle?: 'primaire' | 'college' | 'lycee';
  classeId: string;
  parentIds: string[];
  statut: 'actif' | 'inactif';
  moyenneAnnuelle?: number;
  notes?: Note[];
  generatedUsername?: string;
  generatedPassword?: string;
}