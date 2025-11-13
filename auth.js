// --- Importation des modules ---
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const app = express();

// --- Configuration de la session ---
app.use(
  session({
    secret: "votre_cle_secrete",
    resave: false,
    saveUninitialized: true,
  })
);

// --- Middleware pour lire le corps des requêtes POST ---
app.use(express.urlencoded({ extended: true }));

// --- Connexion à la base de données ---
let db;
(async () => {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "votre_base",
    });
    console.log("✅ Connexion MySQL réussie");
  } catch (err) {
    console.error("❌ Erreur de connexion à la base :", err);
  }
})();

// --- Route de connexion ---
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifie si les champs sont remplis
    if (!email || !password || !role) {
      return res.status(400).send("Champs manquants");
    }

    // Vérifie la connexion DB avant d'exécuter
    if (!db) {
      return res.status(500).send("Base de données non connectée");
    }

    // Requête SQL préparée
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role]
    );

    const user = rows[0];

    if (!user) {
      return res.redirect("/login_error");
    }

    // Vérifie le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.redirect("/login_error");
    }

    // ✅ Connexion réussie
    req.session.user_id = user.id;
    req.session.role = user.role;
    req.session.name = user.name;

    // Redirection selon le rôle
    switch (user.role) {
      case "admin":
        return res.redirect("/dashboard_admin");
      case "organisme":
        return res.redirect("/dashboard_com");
      default:
        return res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

// --- Démarrage du serveur ---
app.listen(3000, () => console.log("🚀 Serveur lancé sur http://localhost:3000"));
