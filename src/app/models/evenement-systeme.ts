// Types pour les événements
export type TypeEvenement = 'creation' | 'modification' | 'suppression' | 'connexion' | 'deconnexion';

export interface EvenementSysteme {
  id: string;
  type: TypeEvenement;
  utilisateurId: string;
  description: string;
  date: Date;
  donnees?: any;
}