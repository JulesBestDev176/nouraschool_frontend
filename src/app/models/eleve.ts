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
  genre?: 'MASCULIN' | 'FEMININ';
  sexe?: 'M' | 'F';
  active?: boolean;
  matricule?: string;
  numeroUrgence?: string;
  dateInscription?: Date | string | null;
  photoUrl?: string;
  cycle?: 'primaire' | 'college' | 'lycee';
  classeId: string;
  parentIds: string[];
  statut: 'actif' | 'inactif';
  moyenneAnnuelle?: number;
  notes?: Note[];
  generatedUsername?: string;
  generatedPassword?: string;
}
