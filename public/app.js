// app.js

const widget = document.getElementById("chat-widget");
const toggle = document.getElementById("chat-toggle");
const bodyDiv = document.getElementById("chat-body");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");

toggle.onclick = () => {
  const isVisible = widget.style.display === "flex";
  widget.style.display = isVisible ? "none" : "flex";
  widget.style.flexDirection = "column";

  if (!isVisible && bodyDiv.innerHTML.trim() === "") {
    addMessage(
      "Bonjour 👋 Je suis l'assistant CRM Burostock.\n" +
        "Je t'aide à utiliser le CRM : Dashboard, Prospects, Pipeline, Analytics, etc.\n\n" +
        "Tu peux me demander par exemple :\n" +
        "• Comment lire le tableau de bord ?\n" +
        "• Comment ajouter un prospect ?\n" +
        "• À quoi sert le Score IA ?\n" +
        "• Comment suivre mes relances ?\n" +
        "• Comment utiliser le pipeline ?\n\n" +
        "Si tu as besoin de plus de détails, je t’indiquerai le guide complet dans la doc. 📄",
      "bot"
    );
  }
};

function addMessage(text, from = "user") {
  const div = document.createElement("div");
  div.style.marginBottom = "8px";
  div.style.whiteSpace = "pre-wrap";

  if (from === "user") {
    div.style.textAlign = "right";
    div.innerHTML = `<strong>Moi :</strong> ${text}`;
  } else {
    div.style.textAlign = "left";
    div.innerHTML = `<strong>Assistant :</strong> ${text}`;
  }

  bodyDiv.appendChild(div);
  bodyDiv.scrollTop = bodyDiv.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("Erreur de connexion à l'assistant 😢", "bot");
  }
}

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
