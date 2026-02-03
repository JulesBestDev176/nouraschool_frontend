import { Injectable } from '@angular/core';
import { EcoleInfo } from '../models/ecole-info';
import { DeveloppeurInfo } from '../models/developpeur-info';
import { User } from '../models/user';
import { Eleve } from '../models/eleve';
import { Enseignant } from '../models/enseignant';
import { Parent } from '../models/parent';
import { Classe } from '../models/classe';
import { Matiere } from '../models/matiere';
import { Note } from '../models/note';
import { Paiement } from '../models/paiement';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private ecoleInfo: EcoleInfo = {
    nom: 'École NOURA',
    slogan: 'Rien ne Change si on ne Change rien',
    adresse: 'Riyadh (PK) 11 carrefour Bamako, Nouakchott, Mauritanie',
    telephone: '+222 49 75 94 68',
    mobile: '+222 49 75 94 68',
    email: 'mouhamedenatigh@gmail.com',
    site: 'www.noura.mr',
    anneeAcademique: '2024-2025',
    directeur: 'Bouna Sow',
    directeurPedagogique: 'Nafisetou Sow',
    devise: 'Ouguiya (MRU)',
    pays: 'Mauritanie',
    region: 'Nouakchott',
    logo: '/assets/images/noura-logo.png'
  };

  private developpeurInfo: DeveloppeurInfo = {
    nom: 'Mohameden EL Atigh Seyid',
    fonction: 'Ingénieur logiciel',
    telephone: '+222 49 75 94 68',
    whatsapp: '+221 78 598 43 96',
    email: 'mouhamedenatigh@gmail.com',
    description: 'Solutions numériques, vision d\'avenir'
  };

  private users: User[] = [
    // {
    //   id: '1',
    //   nom: 'Sow',
    //   prenom: 'Bouna',
    //   email: 'admin@noura.mr',
    //   type: 'administrateur',
    //   motDePasse: 'admin123',
    //   telephone: '+222 49 75 94 68',
    //   adresse: 'Riyadh, Nouakchott, Mauritanie'
    // },
    // {
    //   id: '2',
    //   nom: 'Ould Ahmed',
    //   prenom: 'Mohamed',
    //   email: 'mohamed.ahmed@noura.mr',
    //   type: 'enseignant',
    //   motDePasse: 'prof123',
    //   telephone: '+222 47 32 15 87',
    //   adresse: 'Tevragh-Zeina, Nouakchott',
    //   matieresEnseignees: ['1', '2']
    // },
    // {
    //   id: '3',
    //   nom: 'Mint Cheikh',
    //   prenom: 'Fatimata',
    //   email: 'fatimata.cheikh@noura.mr',
    //   type: 'parent',
    //   motDePasse: 'parent123',
    //   telephone: '+222 46 89 23 45',
    //   adresse: 'Ksar, Nouakchott',
    //   enfantIds: ['1']
    // },
    // {
    //   id: '4',
    //   nom: 'Ould Sidi',
    //   prenom: 'Ahmed',
    //   email: 'ahmed.sidi@eleve.noura.mr',
    //   type: 'eleve',
    //   motDePasse: 'eleve123',
    //   telephone: '+222 46 89 23 45',
    //   adresse: 'Ksar, Nouakchott',
    //   classeId: '1'
    // }
  ];

  private eleves: Eleve[] = [
    {
      id: '1',
      nom: 'Ould Sidi',
      prenom: 'Ahmed',
      dateNaissance: new Date('2012-03-15'),
      lieuNaissance: 'Nouakchott',
      sexe: 'M',
      adresse: 'Ksar, Nouakchott',
      telephone: '+222 46 89 23 45',
      email: 'ahmed.sidi@eleve.noura.mr',
      classeId: '1',
      parentIds: ['1'],
      moyenneAnnuelle: 14.5,
      cycle: 'college',
      statut: 'actif'
    },
    {
      id: '2',
      nom: 'Mint Mohamed',
      prenom: 'Aicha',
      dateNaissance: new Date('2013-07-22'),
      lieuNaissance: 'Nouadhibou',
      sexe: 'F',
      adresse: 'Tevragh-Zeina, Nouakchott',
      telephone: '+222 47 56 78 90',
      email: 'aicha.mohamed@eleve.noura.mr',
      classeId: '1',
      parentIds: ['2'],
      moyenneAnnuelle: 16.2,
      cycle: 'college',
      statut: 'actif'
    },
    {
        id: '3',
        nom: 'Sow',
        prenom: 'Moussa',
        dateNaissance: new Date('2014-01-10'),
        lieuNaissance: 'Sebkha',
        sexe: 'M',
        adresse: 'Sebkha, Nouakchott',
        telephone: '',
        email: 'moussa.sow@eleve.noura.mr',
        classeId: '3',
        parentIds: ['3'],
        moyenneAnnuelle: 12.5,
        cycle: 'primaire',
        statut: 'actif'
    }
  ];

  private enseignants: Enseignant[] = [
    // {
    //   id: '1',
    //   nom: 'Ould Ahmed',
    //   prenom: 'Mohamed',
    //   email: 'mohamed.ahmed@noura.mr',
    //   telephone: '+222 47 32 15 87',
    //   adresse: 'Tevragh-Zeina, Nouakchott',
    //   dateRecrutement: '2020-09-01',
    //   matieresEnseignees: ['1', '2'],
    //   statut: 'actif'
    // }
  ];

  private parents: Parent[] = [
    {
      id: '1',
      nom: 'Mint Cheikh',
      prenom: 'Fatimata',
      email: 'fatimata.cheikh@noura.mr',
      telephone: '+222 46 89 23 45',
      adresse: 'Ksar, Nouakchott',
      profession: 'Commerçante',
      enfantIds: ['1'],
      statut: 'actif'
    },
    {
      id: '2',
      nom: 'Ould Ahmed',
      prenom: 'Sidi',
      email: 'sidi.ahmed@gmail.com',
      telephone: '+222 36 12 34 56',
      adresse: 'Tevragh-Zeina',
      profession: 'Ingénieur',
      enfantIds: [],
      statut: 'actif'
    },
    {
      id: '3',
      nom: 'Sow',
      prenom: 'Amadou',
      email: 'amadou.sow@yahoo.fr',
      telephone: '+222 22 44 66 88',
      adresse: 'Sebkha',
      profession: 'Enseignant',
      enfantIds: [],
      statut: 'actif'
    }
  ];

  private classes: Classe[] = [
    {
      id: '1',
      nom: '6ème A',
      niveau: '6ème',
      nombreMaxEleves: 30,
      enseignantPrincipalId: '1',
      elevesIds: ['1', '2'],
      matieres: []
    },
    {
      id: '2',
      nom: '5ème B',
      niveau: '5ème',
      nombreMaxEleves: 25,
      enseignantPrincipalId: '2',
      elevesIds: [],
      matieres: []
    },
    {
      id: '3',
      nom: 'CM2 A',
      niveau: 'CM2',
      nombreMaxEleves: 30,
      enseignantPrincipalId: '3',
      elevesIds: [],
      matieres: []
    }
  ];

  private matieres: Matiere[] = [
    // {
    //   id: '1',
    //   nom: 'Mathématiques',
    //   code: 'MATH',
    //   coefficient: 4,
    //   description: 'Mathématiques - Algèbre et Géométrie',
    //   enseignantId: '1'
    // },
    // {
    //   id: '2',
    //   nom: 'Français',
    //   code: 'FR',
    //   coefficient: 4,
    //   description: 'Langue française - Expression et Communication',
    //   enseignantId: '1'
    // }
  ];

  private notes: Note[] = [
    // {
    //   id: '1',
    //   eleveId: '1',
    //   matiereId: '1',
    //   trimestre: 1,
    //   ds1: 15,
    //   ds2: 13,
    //   composition: 14,
    //   moyenne: 14,
    //   enseignantId: '1',
    //   dateCreation: '2024-01-15'
    // }
  ];

  private paiements: Paiement[] = [
    // {
    //   id: '1',
    //   eleveId: '1',
    //   montant: 45000,
    //   type: 'inscription',
    //   description: 'Frais d\'inscription année scolaire 2024-2025',
    //   datePaiement: '2024-01-10',
    //   methodePaiement: 'especes',
    //   statut: 'paye'
    // }
  ];

  // Getters pour les données
  getEcoleInfo(): EcoleInfo {
    return this.ecoleInfo;
  }

  getDeveloppeurInfo(): DeveloppeurInfo {
    return this.developpeurInfo;
  }

  getUsers(): User[] {
    return this.users;
  }

  getEleves(): Eleve[] {
    return this.eleves;
  }

  getEnseignants(): Enseignant[] {
    return this.enseignants;
  }

  getParents(): Parent[] {
    return this.parents;
  }

  getClasses(): Classe[] {
    return this.classes;
  }

  getMatieres(): Matiere[] {
    return this.matieres;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getPaiements(): Paiement[] {
    return this.paiements;
  }

  // Méthodes pour obtenir des données spécifiques
  getEleveById(id: string): Eleve | undefined {
    return this.eleves.find(e => e.id === id);
  }

  getClasseById(id: string): Classe | undefined {
    return this.classes.find(c => c.id === id);
  }

  getMatiereById(id: string): Matiere | undefined {
    return this.matieres.find(m => m.id === id);
  }

  getEnseignantById(id: string): Enseignant | undefined {
    return this.enseignants.find(e => e.id === id);
  }

  getNotesForEleve(eleveId: string): Note[] {
    return this.notes.filter(n => n.eleveId === eleveId);
  }

  getPaiementsForEleve(eleveId: string): Paiement[] {
    return this.paiements.filter(p => p.eleveId === eleveId);
  }
}
