export interface Parent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  profession?: string;
  enfantIds: string[];
  statut: 'actif' | 'inactif';
}
