export interface Note {
  id: string;
  eleveId: string;
  matiereId: string;
  enseignantId: string;
  trimestre: number;
  ds1?: number;
  ds2?: number;
  composition?: number;
  moyenne: number;
  dateCreation: Date;
  dateModification?: Date;
}