# Hackathon CRM Project

## Description

Ce projet est une application CRM (Customer Relationship Management) développée dans le cadre d'un hackathon. Elle combine un backend en Python avec Flask et un frontend en Vue.js pour gérer les utilisateurs, les contacts, et les interactions, tout en intégrant des fonctionnalités d'analyse via Azure AI.

---

## Fonctionnalités

### Backend
- **API REST** pour la gestion des utilisateurs, des contacts et des interactions.
- **Swagger UI** pour la documentation interactive des endpoints.
- **Base de données MySQL** pour le stockage des données.
- **Azure AI Integration** pour l'analyse des messages via un agent IA.
- **CORS activé** pour permettre les requêtes cross-origin.

### Frontend
- Application Vue.js avec des composants réutilisables.
- Gestion des vues pour le tableau de bord, les détails des prospects, et l'authentification.
- Intégration de styles SCSS pour une personnalisation avancée.

---

## Prérequis

- **Python 3.9+**
- **Node.js 16+**
- **MySQL**
- **Docker** (optionnel pour le déploiement)

---

## Installation

### Backend

1. Cloner le dépôt :
   ```bash
   git clone git@github.com:mnsmanao-ai/Hackathon.git
   cd Hackathon/backend
   ```

2. Créer un environnement virtuel et installer les dépendances :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sous Windows : venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Configurer la base de données MySQL :
    - Créer une base de données `crm_hackathon`.
    - Mettre à jour les informations de connexion dans `main.py`.

4. Lancer le serveur :
   ```bash
   python main.py
   ```

### Frontend

1. Naviguer dans le dossier `src` :
   ```bash
   cd ../src
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

---

## Déploiement avec Docker

1. Construire et lancer les conteneurs :
   ```bash
   docker-compose up --build
   ```

2. Accéder à l'application :
    - Backend : `http://localhost:3307`
    - Frontend : `http://localhost:5173`

---

## Structure du Projet

### Backend
- `main.py` : Point d'entrée de l'API Flask.
- `api/` : Contient les fichiers TypeScript pour les appels API.
- `model/` : Définitions des modèles de données.

### Frontend
- `src/` : Contient le code source Vue.js.
- `components/` : Composants Vue réutilisables.
- `views/` : Vues principales de l'application.
- `store/` : Gestion de l'état avec Vuex.

---

## Endpoints Principaux

### Utilisateurs
- `GET /users` : Liste des utilisateurs.
- `POST /users` : Créer un utilisateur.

### Contacts
- `GET /contacts` : Liste des contacts.
- `POST /contacts` : Créer un contact.

### Agent IA
- `POST /agent/analyze` : Analyse un message via Azure AI.

---

## Licence

Ce projet est sous licence MIT.
