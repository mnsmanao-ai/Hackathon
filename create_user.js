// --- Importation des modules ---
const express = require("express");
const session = require("express-session");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const app = express();

// --- Configuration session ---
app.use(
  session({
    secret: "votre_cle_secrete",
    resave: false,
    saveUninitialized: true,
  })
);

// --- Middleware pour lire les formulaires ---
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
    console.log("✅ Connexion à la base de données réussie !");
  } catch (err) {
    console.error("❌ Erreur de connexion à la base :", err);
  }
})();

// --- Route GET pour afficher le formulaire ---
app.get("/create-user", (req, res) => {
  if (!req.session.role || req.session.role !== "admin") {
    return res.redirect("/login");
  }

  // Formulaire simple pour la création d’un utilisateur
  res.send(`
    <html><body style="text-align:center; font-family:sans-serif;">
      <h2>Créer un utilisateur</h2>
      <form method="POST" action="/create-user">
        <input type="text" name="name" placeholder="Nom" required /><br><br>
        <input type="email" name="email" placeholder="Email" required /><br><br>
        <input type="password" name="password" placeholder="Mot de passe" required /><br><br>
        <select name="role" required>
          <option value="">-- Sélectionnez un rôle --</option>
          <option value="admin">Admin</option>
          <option value="organisme">Organisme</option>
          <option value="utilisateur">Utilisateur</option>
        </select><br><br>
        <input type="text" name="organisation_name" placeholder="Nom de l’organisation (si organisme)" /><br><br>
        <button type="submit">Créer</button>
      </form>
    </body></html>
  `);
});

// --- Route POST pour créer un utilisateur ---
app.post("/create-user", async (req, res) => {
  if (!req.session.role || req.session.role !== "admin") {
    return res.redirect("/login");
  }

  const { email, password, name, role, organisation_name } = req.body;
  let msg = "";

  try {
    if (!db) {
      return res.status(500).send("Base de données non connectée");
    }

    // Vérifie si l’email existe déjà
    const [exists] = await db.execute("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (exists.length > 0) {
      msg = "<p style='color:red'>⚠️ Email déjà utilisé !</p>";
    } else {
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertion de l'utilisateur
      const [insertResult] = await db.execute(
        "INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, role, name]
      );

      const newUserId = insertResult.insertId;

      // Si rôle = organisme, on ajoute dans la table organisations
      if (role === "organisme" && organisation_name) {
        await db.execute(
          "INSERT INTO organisations (user_id, name, contact_email) VALUES (?, ?, ?)",
          [newUserId, organisation_name, email]
        );
      }

      msg = "<p style='color:green'>✅ Le compte a été créé avec succès !</p>";
    }

    // Réaffiche le formulaire avec le message
    res.send(`
      <html><body style="text-align:center; font-family:sans-serif;">
      <h2>Créer un utilisateur</h2>
      ${msg}
      <a href="/create-user">↩ Retour</a>
      </body></html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// --- Lancement du serveur ---
app.listen(3000, () =>
  console.log("🚀 Serveur lancé sur http://localhost:3000")
);
