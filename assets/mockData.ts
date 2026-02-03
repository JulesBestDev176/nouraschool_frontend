import nouraLogoImage from 'figma:asset/4fc059e019ab2e373268ab43fa804eeddef3b8e8.png';

// Informations de l'école NOURA - Mauritanie
export const ecoleInfo = {
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
  logo: nouraLogoImage
};

// Informations du développeur
export const developpeurInfo = {
  nom: 'Mohameden EL Atigh Seyid',
  fonction: 'Ingénieur logiciel',
  telephone: '+222 49 75 94 68',
  whatsapp: '+221 78 598 43 96',
  email: 'mouhamedenatigh@gmail.com',
  description: 'Solutions numériques, vision d\'avenir'
};

// Utilisateurs avec noms mauritaniens
export const users = [
  {
    id: '1',
    nom: 'Sow',
    prenom: 'Bouna',
    email: 'admin@noura.mr',
    type: 'administrateur',
    motDePasse: 'admin123',
    telephone: '+222 49 75 94 68',
    adresse: 'Riyadh, Nouakchott, Mauritanie'
  },
  {
    id: '2',
    nom: 'Ould Ahmed',
    prenom: 'Mohamed',
    email: 'mohamed.ahmed@noura.mr',
    type: 'enseignant',
    motDePasse: 'prof123',
    telephone: '+222 47 32 15 87',
    adresse: 'Tevragh-Zeina, Nouakchott',
    matieresEnseignees: ['1', '2']
  },
  {
    id: '3',
    nom: 'Mint Cheikh',
    prenom: 'Fatimata',
    email: 'fatimata.cheikh@noura.mr',
    type: 'parent',
    motDePasse: 'parent123',
    telephone: '+222 46 89 23 45',
    adresse: 'Ksar, Nouakchott',
    enfantIds: ['1']
  },
  {
    id: '4',
    nom: 'Ould Sidi',
    prenom: 'Ahmed',
    email: 'ahmed.sidi@eleve.noura.mr',
    type: 'eleve',
    motDePasse: 'eleve123',
    telephone: '+222 46 89 23 45',
    adresse: 'Ksar, Nouakchott',
    classeId: '1'
  }
];

// Parents séparés pour les composants qui en ont besoin
export const parents = [
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
    nom: 'Ould Bah',
    prenom: 'Mahmoud',
    email: 'mahmoud.bah@noura.mr',
    telephone: '+222 47 56 78 90',
    adresse: 'Tevragh-Zeina, Nouakchott',
    profession: 'Ingénieur',
    enfantIds: ['2'],
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Mint Vall',
    prenom: 'Aminata',
    email: 'aminata.vall@noura.mr',
    telephone: '+222 48 67 89 01',
    adresse: 'Dar Naim, Nouakchott',
    profession: 'Enseignante',
    enfantIds: ['3'],
    statut: 'actif'
  },
  {
    id: '4',
    nom: 'Ould Mohamed',
    prenom: 'Sidi',
    email: 'sidi.mohamed@noura.mr',
    telephone: '+222 45 78 90 12',
    adresse: 'Arafat, Nouakchott',
    profession: 'Médecin',
    enfantIds: ['4'],
    statut: 'actif'
  },
  {
    id: '5',
    nom: 'Mint Salem',
    prenom: 'Khadija',
    email: 'khadija.salem@noura.mr',
    telephone: '+222 44 89 01 23',
    adresse: 'Sebkha, Nouakchott',
    profession: 'Avocate',
    enfantIds: ['5'],
    statut: 'actif'
  }
];

// Élèves avec noms mauritaniens
export const eleves = [
  {
    id: '1',
    nom: 'Ould Sidi',
    prenom: 'Ahmed',
    dateNaissance: '2008-03-15',
    lieuNaissance: 'Nouakchott',
    sexe: 'M',
    adresse: 'Ksar, Nouakchott',
    telephone: '+222 46 89 23 45',
    email: 'ahmed.sidi@eleve.noura.mr',
    classeId: '1',
    parentIds: ['1'],
    moyenneAnnuelle: 14.5,
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Mint Mohamed',
    prenom: 'Aicha',
    dateNaissance: '2008-07-22',
    lieuNaissance: 'Nouadhibou',
    sexe: 'F',
    adresse: 'Tevragh-Zeina, Nouakchott',
    telephone: '+222 47 56 78 90',
    email: 'aicha.mohamed@eleve.noura.mr',
    classeId: '1',
    parentIds: ['2'],
    moyenneAnnuelle: 16.2,
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Ould Bah',
    prenom: 'Sidi Mohamed',
    dateNaissance: '2010-01-10',
    lieuNaissance: 'Rosso',
    sexe: 'M',
    adresse: 'Dar Naim, Nouakchott',
    telephone: '+222 48 67 89 01',
    email: 'sidi.bah@eleve.noura.mr',
    classeId: '2',
    parentIds: ['3'],
    moyenneAnnuelle: 12.8,
    statut: 'actif'
  },
  {
    id: '4',
    nom: 'Mint Vall',
    prenom: 'Mariem',
    dateNaissance: '2009-05-18',
    lieuNaissance: 'Kiffa',
    sexe: 'F',
    adresse: 'Arafat, Nouakchott',
    telephone: '+222 45 78 90 12',
    email: 'mariem.vall@eleve.noura.mr',
    classeId: '1',
    parentIds: ['4'],
    moyenneAnnuelle: 15.7,
    statut: 'actif'
  },
  {
    id: '5',
    nom: 'Ould Cheikh',
    prenom: 'Abdellahi',
    dateNaissance: '2007-11-30',
    lieuNaissance: 'Atar',
    sexe: 'M',
    adresse: 'Sebkha, Nouakchott',
    telephone: '+222 44 89 01 23',
    email: 'abdellahi.cheikh@eleve.noura.mr',
    classeId: '3',
    parentIds: ['5'],
    moyenneAnnuelle: 13.4,
    statut: 'actif'
  }
];

// Enseignants avec noms mauritaniens
export const enseignants = [
  {
    id: '1',
    nom: 'Ould Ahmed',
    prenom: 'Mohamed',
    email: 'mohamed.ahmed@noura.mr',
    telephone: '+222 47 32 15 87',
    adresse: 'Tevragh-Zeina, Nouakchott',
    dateRecrutement: '2020-09-01',
    matieresEnseignees: ['1', '2'],
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Mint Brahim',
    prenom: 'Khadija',
    email: 'khadija.brahim@noura.mr',
    telephone: '+222 46 78 90 12',
    adresse: 'Ksar, Nouakchott',
    dateRecrutement: '2019-10-15',
    matieresEnseignees: ['3', '4'],
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Ould Sid Ahmed',
    prenom: 'Yahya',
    email: 'yahya.sidahmed@noura.mr',
    telephone: '+222 45 67 89 01',
    adresse: 'Arafat, Nouakchott',
    dateRecrutement: '2021-01-10',
    matieresEnseignees: ['5'],
    statut: 'actif'
  }
];

// Classes
export const classes = [
  {
    id: '1',
    nom: '6ème A',
    niveau: '6ème',
    nombreMaxEleves: 30,
    enseignantPrincipalId: '1',
    elevesIds: ['1', '2', '4']
  },
  {
    id: '2',
    nom: 'CP A',
    niveau: 'CP',
    nombreMaxEleves: 25,
    enseignantPrincipalId: '2',
    elevesIds: ['3']
  },
  {
    id: '3',
    nom: '3ème B',
    niveau: '3ème',
    nombreMaxEleves: 28,
    enseignantPrincipalId: '3',
    elevesIds: ['5']
  }
];

// Matières
export const matieres = [
  {
    id: '1',
    nom: 'Mathématiques',
    code: 'MATH',
    coefficient: 4,
    description: 'Mathématiques - Algèbre et Géométrie',
    enseignantId: '1'
  },
  {
    id: '2',
    nom: 'Français',
    code: 'FR',
    coefficient: 4,
    description: 'Langue française - Expression et Communication',
    enseignantId: '1'
  },
  {
    id: '3',
    nom: 'Arabe',
    code: 'AR',
    coefficient: 4,
    description: 'Langue Arabe - Lecture et Expression',
    enseignantId: '2'
  },
  {
    id: '4',
    nom: 'Sciences Naturelles',
    code: 'SVT',
    coefficient: 3,
    description: 'Sciences de la Vie et de la Terre',
    enseignantId: '2'
  },
  {
    id: '5',
    nom: 'Histoire-Géographie',
    code: 'HG',
    coefficient: 3,
    description: 'Histoire et Géographie',
    enseignantId: '3'
  }
];

// Notes
export const notes = [
  {
    id: '1',
    eleveId: '1',
    matiereId: '1',
    trimestre: 1,
    ds1: 15,
    ds2: 13,
    composition: 14,
    moyenne: 14,
    enseignantId: '1',
    dateCreation: '2024-01-15'
  },
  {
    id: '2',
    eleveId: '1',
    matiereId: '2',
    trimestre: 1,
    ds1: 16,
    ds2: 15,
    composition: 15,
    moyenne: 15,
    enseignantId: '1',
    dateCreation: '2024-01-15'
  },
  {
    id: '3',
    eleveId: '2',
    matiereId: '1',
    trimestre: 1,
    ds1: 17,
    ds2: 16,
    composition: 16,
    moyenne: 16.25,
    enseignantId: '1',
    dateCreation: '2024-01-15'
  },
  {
    id: '4',
    eleveId: '2',
    matiereId: '3',
    trimestre: 1,
    ds1: 18,
    ds2: 17,
    composition: 17,
    moyenne: 17.25,
    enseignantId: '2',
    dateCreation: '2024-01-15'
  }
];

// Bulletins
export const bulletins = [
  {
    id: '1',
    eleveId: '1',
    trimestre: 1,
    annee: '2024-2025',
    notes: [
      { matiereId: '1', moyenne: 14, coefficient: 4 },
      { matiereId: '2', moyenne: 15, coefficient: 4 }
    ],
    moyenneGenerale: 14.5,
    rang: 2,
    totalEleves: 25,
    appreciation: 'Bon travail Ahmed, continue tes efforts en mathématiques',
    dateGeneration: '2024-01-20'
  }
];

// Paiements en Ouguiya (MRU)
export const paiements = [
  {
    id: '1',
    eleveId: '1',
    montant: 45000,
    type: 'inscription',
    description: 'Frais d\'inscription année scolaire 2024-2025',
    datePaiement: '2024-01-10',
    methodePaiement: 'especes',
    statut: 'paye'
  },
  {
    id: '2',
    eleveId: '2',
    montant: 25000,
    type: 'mensualite',
    description: 'Mensualité Janvier 2024',
    datePaiement: '2024-01-05',
    methodePaiement: 'virement',
    statut: 'paye'
  },
  {
    id: '3',
    eleveId: '3',
    montant: 30000,
    type: 'mensualite',
    description: 'Mensualité Février 2024',
    datePaiement: null,
    methodePaiement: null,
    statut: 'en_attente'
  }
];

// Réclamations
export const reclamations = [
  {
    id: '1',
    eleveId: '1',
    noteId: '1',
    motif: 'Erreur de saisie',
    description: 'La note de composition en mathématiques semble incorrecte',
    statut: 'en_attente',
    dateCreation: '2024-01-25',
    reponse: null,
    dateReponse: null
  }
];

// Tarifs en Ouguiya (MRU)
export const tarifsEcole = {
  primaire: {
    inscription: 35000,
    mensualite: 18000,
    examen: 5000
  },
  secondaire: {
    inscription: 45000,
    mensualite: 25000,
    examen: 8000
  },
  lycee: {
    inscription: 55000,
    mensualite: 30000,
    bac: 12000
  }
};

// Statistiques générales
export const statistiques = {
  totalEleves: eleves.length,
  totalEnseignants: enseignants.length,
  totalClasses: classes.length,
  totalMatieres: matieres.length,
  elevesActifs: eleves.filter(e => e.statut === 'actif').length,
  enseignantsActifs: enseignants.filter(e => e.statut === 'actif').length,
  moyenneGeneraleEcole: eleves.reduce((acc, eleve) => acc + (eleve.moyenneAnnuelle || 0), 0) / eleves.length,
  totalMontantPaye: paiements.filter(p => p.statut === 'paye').reduce((acc, p) => acc + p.montant, 0),
  totalMontantEnAttente: paiements.filter(p => p.statut === 'en_attente').reduce((acc, p) => acc + p.montant, 0),
  paiementsEnAttente: paiements.filter(p => p.statut === 'en_attente').length,
  reclamationsEnAttente: reclamations.filter(r => r.statut === 'en_attente').length
};