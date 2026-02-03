// Interface pour les permissions
export interface Permission {
  module: string;
  actions: ('read' | 'write' | 'delete')[];
}