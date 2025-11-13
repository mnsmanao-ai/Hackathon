from flask import Flask, request, jsonify
import pymysql
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
import config


app = Flask(__name__)


# -----------------------------------
# 🔌 CONFIG MYSQL
# -----------------------------------
def db():
    return pymysql.connect(
        host="s0c8sws804cgw8c0ko8cg4sw",
        user="hackaton",
        password="#cfvPQcp%Fi2K0",  # mets ton mot de passe MySQL
        database="crm_hackathon",
        cursorclass=pymysql.cursors.DictCursor
    )


# -----------------------------------
# 🤖 CONFIG AZURE AGENT
# -----------------------------------
project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://gestionprospect1234567-resource.services.ai.azure.com/api/projects/Gestionprospect1234567"
)


def call_agent(message: str):
    """Envoie un message à ton agent Azure IA et retourne sa réponse."""
    agent = project.agents.get_agent(config.AGENT_ID)

    # Créer un thread
    thread = project.agents.threads.create()

    # Ajouter message utilisateur
    project.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=message
    )

    # Lancer execution
    run = project.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id
    )

    if run.status == "failed":
        return {"error": run.last_error}

    # Récupérer les messages
    messages = project.agents.messages.list(thread_id=thread.id)

    result = None
    for msg in messages:
        if msg.text_messages:
            result = msg.text_messages[-1].text.value

    return {"response": result}


# -----------------------------------
# 1️⃣ GET CONTACT
# -----------------------------------
@app.get("/contact/<int:id_contact>")
def contact_get(id_contact):
    con = db()
    with con.cursor() as c:
        c.execute("SELECT * FROM contacts WHERE id_contact=%s", (id_contact,))
        contact = c.fetchone()

        c.execute("SELECT * FROM interactions WHERE contact_id=%s", (id_contact,))
        interactions = c.fetchall()

        c.execute("SELECT * FROM scoring_history WHERE contact_id=%s", (id_contact,))
        scores = c.fetchall()

    return jsonify({
        "contact": contact,
        "interactions": interactions,
        "scores": scores
    })


# -----------------------------------
# 2️⃣ UPDATE CONTACT SCORE
# -----------------------------------
@app.patch("/contact/<int:id_contact>/score")
def update_score(id_contact):
    data = request.json
    score = data.get("score")

    if score is None:
        return jsonify({"error": "Missing score"}), 400

    con = db()
    with con.cursor() as c:
        c.execute("""
            UPDATE contacts
            SET last_score=%s, updated_at=NOW()
            WHERE id_contact=%s
        """, (score, id_contact))
        con.commit()

    return jsonify({"message": "score_updated", "score": score})


# -----------------------------------
# 3️⃣ CREATE SCORING HISTORY
# -----------------------------------
@app.post("/scoring_history")
def scoring_history_create():
    data = request.json

    required = ["contact_id", "score", "algorithm_version", "reason"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    con = db()
    with con.cursor() as c:
        c.execute("""
            INSERT INTO scoring_history(contact_id, score, algorithm_version, reason, created_at)
            VALUES (%s, %s, %s, %s, NOW())
        """, (
            data["contact_id"],
            data["score"],
            data["algorithm_version"],
            data["reason"]
        ))
        con.commit()

    return jsonify({"message": "history_created"})


# -----------------------------------
# 4️⃣ CREATE TASK
# -----------------------------------
@app.post("/tasks")
def task_create():
    data = request.json

    required = ["contact_id", "score", "algorithm_version", "reason"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    con = db()
    with con.cursor() as c:
        c.execute("""
            INSERT INTO tasks(contact_id, score, algorithm_version, reason, created_at)
            VALUES (%s, %s, %s, %s, NOW())
        """, (
            data["contact_id"],
            data["score"],
            data["algorithm_version"],
            data["reason"]
        ))
        con.commit()

    return jsonify({"message": "task_created"})


# -----------------------------------
# 5️⃣ ROUTE AGENT IA
# -----------------------------------
@app.post("/agent/analyze")
def agent_analyze():
    data = request.json
    message = data.get("message")

    if not message:
        return jsonify({"error": "Missing message"}), 400

    result = call_agent(message)

    return jsonify(result)


# -----------------------------------
# HOME
# -----------------------------------
@app.get("/")
def home():
    return {
        "status": "CRM API running",
        "agent": config.AGENT_ID,
        "version": "2.0"
    }


# -----------------------------------
# RUN API
# -----------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
