import { Note } from "./note";

export interface Eleve {
  id: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone?: string;
  dateNaissance: Date | string | null;
  adresse?: string;
  lieuNaissance?: string;
  sexe?: 'M' | 'F';
  genre?: 'MASCULIN' | 'FEMININ';
  cycle?: 'primaire' | 'college' | 'lycee';
  active?: boolean;
  matricule?: string;
  numeroUrgence?: string;
  dateInscription?: Date | string | null;
  photoUrl?: string;
  classeId: string;
  parentIds: string[];
  statut: 'actif' | 'inactif';
  moyenneAnnuelle?: number;
  notes?: Note[];
  generatedUsername?: string;
  generatedPassword?: string;
}
