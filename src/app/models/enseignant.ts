export interface Enseignant {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  matricule?: string;
  specialite: string;
  matieresEnseignees: string[];
  classesAssignees: string[];
  salaire?: number;
  active?: boolean;
  statut: 'actif' | 'inactif';
}