const express = require("express");
const path = require("path");
const { procedures } = require("./crmData");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "docs")));

function formatProcedureReply(p) {
  return [
    `1️⃣ Objectif : ${p.titre}`,
    "",
    "2️⃣ Étapes principales :",
    ...p.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "3️⃣ Bonnes pratiques :",
    "- Mettre à jour le CRM juste après chaque action.",
    "- Compléter les champs importants (score IA, secteur, dernière interaction).",
    "",
    '➡ Pour plus de détails : <a href="/docs/guide_crm_burostock.html" target="_blank">ouvrir le guide complet du CRM</a>.'
  ].join("\n");
}

app.post("/api/chat", (req, res) => {
  try {
    const raw = (req.body && req.body.message) || "";
    const message = String(raw).toLowerCase();

    let p = null;

    // Dashboard / tableau de bord
    if (message.includes("dashboard") || message.includes("tableau de bord")) {
      p = procedures.find(pr => pr.id === "dashboard");
    }

    // Pipeline
    if (!p && message.includes("pipeline")) {
      p = procedures.find(pr => pr.id === "pipeline");
    }

    // Prospects : écran
    if (!p && message.includes("prospects") && (message.includes("écran") || message.includes("ecran") || message.includes("liste"))) {
      p = procedures.find(pr => pr.id === "ecran-prospects");
    }

    // Prospects : ajouter
    if (!p && message.includes("ajouter") && message.includes("prospect")) {
      p = procedures.find(pr => pr.id === "ajouter-prospect");
    }

    // Score IA
    if (!p && (message.includes("score ia") || message.includes("scorer"))) {
      p = procedures.find(pr => pr.id === "score-ia");
    }

    // Créer un client
    if (!p && message.includes("client") && (message.includes("créer") || message.includes("creer") || message.includes("nouveau"))) {
      p = procedures.find(pr => pr.id === "creer-client");
    }

    // Devis -> transformation en commande (plus spécifique)
    if (!p && message.includes("devis") && message.includes("commande")) {
      p = procedures.find(pr => pr.id === "devis-commande");
    }

    // Devis -> création (moins spécifique, donc après)
    if (!p && message.includes("devis")) {
      p = procedures.find(pr => pr.id === "creer-devis");
    }

    // Commande : suivi
    if (!p && message.includes("commande") && message.includes("suivre")) {
      p = procedures.find(pr => pr.id === "suivre-commande");
    }

    // SAV
    if (
      !p &&
      (message.includes("sav") ||
        message.includes("service après-vente") ||
        message.includes("service apres-vente") ||
        message.includes("problème") ||
        message.includes("probleme"))
    ) {
      p = procedures.find(pr => pr.id === "sav");
    }

    // Paiement
    if (
      !p &&
      (message.includes("paiement") ||
        message.includes("payer") ||
        message.includes("règlement") ||
        message.includes("reglement"))
    ) {
      p = procedures.find(pr => pr.id === "paiement");
    }

    if (p) {
      return res.json({ reply: formatProcedureReply(p) });
    }

    return res.json({
      reply:
        "Je suis l'assistant CRM Burostock.\n" +
        "Tu peux me demander par exemple :\n" +
        "- \"Comment lire le tableau de bord ?\"\n" +
        "- \"Comment utiliser le pipeline ?\"\n" +
        "- \"Comment ajouter un prospect ?\"\n" +
        "- \"À quoi sert le Score IA ?\"\n" +
        "- \"Comment créer un devis ?\"\n\n" +
        'Pour plus de détails : <a href="/docs/guide_crm_burostock.html" target="_blank">ouvrir le guide complet du CRM</a>.'
    });
  } catch (err) {
    console.error("Erreur dans /api/chat :", err);
    return res.status(500).json({
      reply: "Oups, une erreur est survenue côté serveur 😢 (regarde la console Node)."
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
