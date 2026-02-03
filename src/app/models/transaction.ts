export interface Transaction {
  id: string;
  date: Date;
  reference: string;
  type: 'recette' | 'depense';
  categorie: string;
  montant: number;
  description: string;
  methode: 'especes' | 'virement' | 'cheque' | 'carte';
  eleveNom?: string;
  createdBy: string;
}