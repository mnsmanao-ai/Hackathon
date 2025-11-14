-- ------------------------------------------------------------
-- Base de données : crm_hackathon
-- ------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS crm_hackathon
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE crm_hackathon;

-- ------------------------------------------------------------
-- Table : users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255),
    phone VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME NULL
);

-- ------------------------------------------------------------
-- Table : roles
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- ------------------------------------------------------------
-- Table : companies
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS companies (
    id_company INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    website VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Table : contacts
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
    id_contact INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(50),
    source VARCHAR(100),
    status_interaction VARCHAR(100),
    last_score INT DEFAULT 0,
    potential_value INT DEFAULT 0,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id_company)
);

-- ------------------------------------------------------------
-- Table : interactions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS interactions (
    id_interaction INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT,
    user_id INT,
    channel VARCHAR(50),
    subject VARCHAR(255),
    content TEXT,
    date_interetaction DATETIME DEFAULT CURRENT_TIMESTAMP,
    sentimail_score INT,
    follow_up_date DATETIME,
    follow_up BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (contact_id) REFERENCES contacts(id_contact),
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- ------------------------------------------------------------
-- Table : scoring_history
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scoring_history (
    id_score INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT,
    score INT,
    algorithm_version VARCHAR(50),
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id_contact)
);

-- ------------------------------------------------------------
-- Table : tasks
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT,
    score INT,
    algorithm_version VARCHAR(50),
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id_contact)
);

-- ------------------------------------------------------------
-- Table : campaigns
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS campaigns (
    id_campaign INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    channel VARCHAR(100),
    start_date DATE,
    budget INT,
    results TEXT
);

-- ------------------------------------------------------------
-- Table : leads
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id_lead INT AUTO_INCREMENT PRIMARY KEY,
    id_campaign INT,
    name VARCHAR(255),
    channel VARCHAR(100),
    start_date DATE,
    budget INT,
    results TEXT,
    FOREIGN KEY (id_campaign) REFERENCES campaigns(id_campaign)
);

-- ------------------------------------------------------------
-- Table : audit_logs
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    entity VARCHAR(100),
    entity_id INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(100),
    changes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id_user)
);

-- ------------------------------------------------------------
-- Données de test
-- ------------------------------------------------------------

-- 🔑 Rôles
INSERT INTO roles (name)
VALUES
('Administrateur'),
('Commercial'),
('Support'),
('Marketing');

-- 👤 Utilisateurs
INSERT INTO users (firstname, lastname, email, password_hash, phone, active)
VALUES
('Alice', 'Martin', 'alice.martin@crm.com', SHA2('admin123', 256), '0600000001', TRUE),
('Bob', 'Durand', 'bob.durand@crm.com', SHA2('password', 256), '0600000002', TRUE),
('Chloé', 'Petit', 'chloe.petit@crm.com', SHA2('password', 256), '0600000003', TRUE);

-- 🏢 Entreprises
INSERT INTO companies (name, industry, size, website, city, country, email, phone)
VALUES
('TechNova', 'Technologie', '50-100', 'https://www.technova.com', 'Paris', 'France', 'contact@technova.com', '0142000000'),
('GreenWorld', 'Environnement', '20-50', 'https://www.greenworld.fr', 'Lyon', 'France', 'info@greenworld.fr', '0478000000'),
('DataCorp', 'Consulting', '100-500', 'https://www.datacorp.eu', 'Bruxelles', 'Belgique', 'support@datacorp.eu', '0288000000');

-- 👥 Contacts
INSERT INTO contacts (company_id, firstname, lastname, email, phone, source, status_interaction, last_score, potential_value, tags)
VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@technova.com', '0601000001', 'Salon Tech 2025', 'En attente', 40, 2000, 'B2B, SaaS'),
(2, 'Marie', 'Lefevre', 'marie.lefevre@greenworld.fr', '0602000002', 'LinkedIn', 'Intéressé', 75, 5000, 'Durable, Écologie'),
(3, 'Lucas', 'Moreau', 'lucas.moreau@datacorp.eu', '0603000003', 'Email', 'Client actif', 90, 10000, 'Consulting, Premium');

-- 💬 Interactions
INSERT INTO interactions (contact_id, user_id, channel, subject, content, sentimail_score, follow_up_date, follow_up)
VALUES
(1, 2, 'Email', 'Présentation du CRM', 'Bonjour Jean, je vous présente notre solution CRM...', 65, '2025-11-20', TRUE),
(2, 3, 'Appel', 'Suivi de la proposition', 'Discussion sur les besoins en automatisation marketing.', 80, '2025-11-22', FALSE),
(3, 1, 'Réunion', 'Renouvellement du contrat', 'Rencontre client pour négocier le nouveau contrat annuel.', 90, NULL, FALSE);

-- 📈 Historique des scores
INSERT INTO scoring_history (contact_id, score, algorithm_version, reason)
VALUES
(1, 40, 'v1.0', 'Premier contact établi'),
(2, 75, 'v1.0', 'Contact qualifié via LinkedIn'),
(3, 90, 'v1.0', 'Client fidèle, score élevé');

-- 🧾 Tâches
INSERT INTO tasks (contact_id, score, algorithm_version, reason)
VALUES
(1, 40, 'v1.0', 'Préparer une démo produit'),
(2, 75, 'v1.0', 'Envoyer une offre personnalisée'),
(3, 90, 'v1.0', 'Appeler pour suivi contrat');

-- 📢 Campagnes
INSERT INTO campaigns (name, channel, start_date, budget, results)
VALUES
('Campagne Email Q4', 'Email', '2025-10-01', 5000, 'Taux d’ouverture 45%'),
('Salon Tech 2025', 'Événement', '2025-09-15', 12000, '15 nouveaux prospects'),
('Webinar CRM', 'Web', '2025-11-05', 3000, '80 participants');

-- 🧩 Leads
INSERT INTO leads (id_campaign, name, channel, start_date, budget, results)
VALUES
(1, 'Prospect CRM Alpha', 'Email', '2025-10-03', 1000, '2 rendez-vous obtenus'),
(2, 'TechWorld SARL', 'Événement', '2025-09-16', 3000, 'Contact qualifié'),
(3, 'NovaGroup', 'Web', '2025-11-05', 800, 'Inscription newsletter');

-- 🧠 Logs d’audit
INSERT INTO audit_logs (user_id, action, entity, entity_id, ip_address, changes)
VALUES
(1, 'Création', 'contact', 1, '192.168.1.10', 'Ajout du contact Jean Dupont'),
(2, 'Mise à jour', 'contact', 2, '192.168.1.11', 'Modification du statut : Intéressé'),
(3, 'Connexion', 'user', 3, '192.168.1.12', 'Connexion réussie');

-- ------------------------------------------------------------
-- ✅ Données insérées avec succès
-- ------------------------------------------------------------
