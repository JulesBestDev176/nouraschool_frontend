export interface Paiement {
  id: string;
  eleveId: string;
  parentId?: string;
  type: 'scolarite' | 'cantine' | 'transport' | 'activites' | 'inscription' | 'autre';
  montant: number;
  description: string;
  dateEcheance: Date;
  datePaiement?: Date;
  statut: 'en_attente' | 'paye' | 'en_retard';
  reference: string;
  methode?: 'especes' | 'virement' | 'cheque' | 'carte';
}
