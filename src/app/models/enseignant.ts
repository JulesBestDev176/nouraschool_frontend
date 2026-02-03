export interface Enseignant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  specialite: string;
  matieresEnseignees: string[];
  classesAssignees: string[];
  salaire?: number;
  statut: 'actif' | 'inactif';
}