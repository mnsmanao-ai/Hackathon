// crmData.js
// Données fictives pour ton CRM "Burostock"

const clients = [
  {
    id: 1,
    nom: "Société Dupont",
    type: "PME",
    secteur: "Aménagement de bureaux"
  },
  {
    id: 2,
    nom: "BuroTech",
    type: "Grand compte",
    secteur: "Informatique"
  }
];

const procedures = [
  {
    id: "dashboard",
    titre: "Lire le tableau de bord",
    steps: [
      "Aller dans le menu 'Dashboard' dans la barre latérale.",
      "Regarder le nombre de 'Prospects actifs' pour voir ton volume actuel.",
      "Utiliser 'Taux de conversion' pour évaluer l'efficacité commerciale.",
      "Vérifier 'Ventes mensuelles' pour suivre l'objectif du mois.",
      "Consulter 'Relances en attente' pour savoir combien d'actions urgentes tu as à faire."
    ]
  },
  {
    id: "ecran-prospects",
    titre: "Comprendre l'écran Prospects",
    steps: [
      "Accéder au menu 'Prospects' dans la barre latérale.",
      "Utiliser la colonne 'Score IA' pour prioriser les prospects les plus chauds.",
      "Regarder la colonne 'Dernière interaction' pour savoir qui relancer en priorité.",
      "Utiliser le bouton 'Ajouter un prospect' pour créer une nouvelle fiche.",
      "Utiliser le bouton 'Scorer' pour recalculer le score IA de la liste."
    ]
  },
  {
    id: "ajouter-prospect",
    titre: "Ajouter un nouveau prospect",
    steps: [
      "Cliquer sur le bouton 'Ajouter un prospect' en haut à droite de la liste.",
      "Renseigner : Nom, Entreprise, Secteur, Email, Téléphone.",
      "Préciser la source du prospect dans le champ prévu (si présent).",
      "Enregistrer la fiche pour qu'elle apparaisse dans la liste.",
      "Le CRM calculera un Score IA pour t'indiquer la priorité."
    ]
  },
  {
    id: "score-ia",
    titre: "Comprendre le Score IA et le classement des prospects",
    steps: [
      "Le Score IA va de 0 à 100 et indique la probabilité que le prospect devienne client.",
      "Un score élevé (par ex. 80+) = prospect très prioritaire.",
      "Un score moyen (50–79) = prospect à suivre rapidement.",
      "Un score faible (< 50) = prospect froid ou à qualifier davantage.",
      "Croiser le Score IA avec la 'Dernière interaction' pour savoir qui appeler / relancer."
    ]
  },
  {
    id: "pipeline",
    titre: "Utiliser le pipeline commercial",
    steps: [
      "Aller dans le menu 'Pipeline'.",
      "Visualiser les différentes étapes (ex : Nouveau, Qualifié, Devis envoyé, Gagné, Perdu).",
      "Ouvrir une opportunité pour voir le montant, la probabilité et les prochaines actions.",
      "Mettre à jour l'étape dès qu'il y a une évolution (rendez-vous, devis, signature...).",
      "S'assurer que les opportunités 'Gagné' et 'Perdu' sont bien mises à jour pour avoir des stats fiables."
    ]
  },
  {
    id: "creer-client",
    titre: "Créer un nouveau client professionnel",
    steps: [
      "Aller dans le menu 'Clients' (ou section équivalente).",
      "Cliquer sur le bouton 'Nouveau client'.",
      "Remplir les informations : Raison sociale, SIRET, Adresse de facturation, Adresse de livraison.",
      "Ajouter le contact principal (nom, prénom, email, téléphone).",
      "Choisir le type de client (PME, Grand compte, Administration, etc.).",
      "Enregistrer la fiche client."
    ]
  },
  {
    id: "creer-devis",
    titre: "Créer un devis à partir de la fiche client",
    steps: [
      "Ouvrir la fiche du client concerné.",
      "Aller dans l'onglet 'Devis'.",
      "Cliquer sur 'Nouveau devis'.",
      "Ajouter les articles (bureaux, chaises, armoires, etc.) depuis le catalogue.",
      "Vérifier les quantités, prix unitaires, remises et TVA.",
      "Ajouter les frais de livraison si nécessaire.",
      "Enregistrer le devis et l'envoyer par email au client."
    ]
  },
  {
    id: "devis-commande",
    titre: "Transformer un devis en commande",
    steps: [
      "Aller dans l'onglet 'Devis' du client.",
      "Ouvrir le devis accepté par le client.",
      "Cliquer sur le bouton 'Transformer en commande'.",
      "Vérifier les informations : adresse de livraison, conditions de paiement, délais.",
      "Enregistrer la commande.",
      "Informer la logistique ou le magasin si nécessaire."
    ]
  },
  {
    id: "suivre-commande",
    titre: "Suivre le statut d'une commande",
    steps: [
      "Aller dans le menu 'Commandes'.",
      "Rechercher la commande par numéro ou par client.",
      "Vérifier le statut : Brouillon, Confirmée, En préparation, Expédiée, Livrée.",
      "Consulter les dates prévues de préparation et de livraison.",
      "En cas de retard, ajouter un commentaire interne et prévenir le client."
    ]
  },
  {
    id: "sav",
    titre: "Créer un ticket SAV (service après-vente)",
    steps: [
      "Aller dans la fiche du client ou de la commande concernée.",
      "Cliquer sur 'Nouveau ticket SAV'.",
      "Renseigner le type de problème (casse, défaut, erreur de livraison, etc.).",
      "Ajouter des notes précises et, si possible, des références produits.",
      "Assigner le ticket à la personne en charge du SAV.",
      "Mettre à jour le ticket au fur et à mesure des actions."
    ]
  },
  {
    id: "paiement",
    titre: "Enregistrer un paiement client",
    steps: [
      "Aller dans la commande concernée.",
      "Cliquer sur 'Enregistrer un paiement'.",
      "Choisir le mode de paiement (CB, virement, chèque, etc.).",
      "Saisir le montant payé et la date.",
      "Valider l'écriture.",
      "Vérifier que le solde de la commande est bien à jour."
    ]
  }
];

module.exports = { clients, procedures };
