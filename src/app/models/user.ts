export interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  type: 'administrateur' | 'enseignant' | 'parent' | 'eleve' | 'comptable' | 'surveillant' | 'assistant';
  role?: string;
  telephone?: string;
  adresse?: string;
  dateNaissance?: Date;
  statut: 'actif' | 'inactif';
//    motDePasse: 'admin123';
  
  // Champs spécifiques selon le type
  enfantIds?: string[]; // Pour les parents
  classeId?: string; // Pour les élèves
  matieresEnseignees?: string[]; // Pour les enseignants
  moyenneAnnuelle?: number; // Pour les élèves
  profession?: string; // Pour les parents
  specialite?: string; // Pour les enseignants
}