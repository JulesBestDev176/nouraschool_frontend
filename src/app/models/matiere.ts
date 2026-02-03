export interface Matiere {
  id: string;
  nom: string;
  code: string;
  coefficient: number;
  description?: string;
  enseignantIds: string[];
  classeIds: string[];
  couleur?: string;
}