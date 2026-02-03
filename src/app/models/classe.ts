export interface Classe {
  id: string;
  nom: string;
  niveau: string;
  enseignantPrincipalId: string;
  elevesIds: string[];
  nombreMaxEleves: number;
  matieres: string[];
  salle?: string;
  horaires?: {
    debut: string;
    fin: string;
  };
}