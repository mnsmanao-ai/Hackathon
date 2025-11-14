from flask import Flask, request, jsonify
import pymysql
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from flasgger import Swagger, swag_from
from flask_cors import CORS


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "https://h44c4wggso0wkksgosggs084.lucieblr.com"}})
swagger = Swagger(app)  # 🔥 active Swagger UI


# ----------------------------------------------------------
# 🔌 MYSQL CONFIG
# ----------------------------------------------------------
def db():
    return pymysql.connect(
        host="s0c8sws804cgw8c0ko8cg4sw",
        user="hackaton",
        password="#cfvPQcp%Fi2K0",
        database="crm_hackathon",
        cursorclass=pymysql.cursors.DictCursor
    )


# ----------------------------------------------------------
# 🤖 AZURE AGENT
# ----------------------------------------------------------
api_key = os.getenv("DwZVlFDObsJ8VlKIZFwM9BB6MZ8CuUfjYtgykaUFFxyfDpS914vwJQQJ99BKACfhMk5XJ3w3AAAAACOG5f4I")


client = AgentsClient(
    endpoint="https://aihackmetropole-resource.services.ai.azure.com/api/projects/AIHackmetropole",
    credential=AzureKeyCredential(api_key)
)

project = client.projects.get_project("aihackmetropole")

def call_agent(message: str):
    agent = project.agents.get_agent("asst_TAELII8aWgovcx7uJ72I9QCo")
    thread = project.agents.threads.create()

    project.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=message
    )

    run = project.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent.id
    )

    if run.status == "failed":
        return {"error": run.last_error}

    messages = project.agents.messages.list(thread_id=thread.id)
    result = None

    for msg in messages:
        if msg.text_messages:
            result = msg.text_messages[-1].text.value

    return {"response": result}


# ----------------------------------------------------------
# 📌 USERS
# ----------------------------------------------------------
@app.get("/users")
@swag_from({
    "summary": "Liste des utilisateurs",
    "tags": ["Users"],
    "responses": {
        200: {"description": "Liste complète des utilisateurs"}
    }
})
def users_list():
    con = db()
    with con.cursor() as c:
        c.execute("SELECT * FROM users")
        return jsonify(c.fetchall())


@app.get("/users/<int:id_user>")
@swag_from({
    "summary": "Récupérer un utilisateur",
    "tags": ["Users"],
    "parameters": [{
        "name": "id_user",
        "in": "path",
        "required": True,
        "schema": {"type": "integer"}
    }],
    "responses": {200: {"description": "Utilisateur trouvé"}}
})
def users_get(id_user):
    con = db()
    with con.cursor() as c:
        c.execute("SELECT * FROM users WHERE id_user=%s", (id_user,))
        return jsonify(c.fetchone())


@app.post("/users")
@swag_from({
    "summary": "Créer un utilisateur",
    "tags": ["Users"],
    "requestBody": {
        "required": True,
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "firstname": {"type": "string"},
                        "lastname": {"type": "string"},
                        "email": {"type": "string"},
                        "password_hash": {"type": "string"},
                        "phone": {"type": "string"},
                        "active": {"type": "boolean"}
                    }
                }
            }
        }
    },
    "responses": {200: {"description": "Utilisateur créé"}}
})
def users_create():
    data = request.json
    con = db()
    with con.cursor() as c:
        c.execute("""
            INSERT INTO users(firstname, lastname, email, password_hash, phone, active)
            VALUES (%s,%s,%s,%s,%s,%s)
        """, (
            data["firstname"],
            data["lastname"],
            data["email"],
            data["password_hash"],
            data["phone"],
            data.get("active", True),
        ))
        con.commit()
    return jsonify({"message": "user_created"})


# ----------------------------------------------------------
# 👥 CONTACTS (exemple complet)
# ----------------------------------------------------------
@app.get("/contacts")
@swag_from({
    "summary": "Liste complète des contacts",
    "tags": ["Contacts"],
    "responses": {200: {"description": "Liste des contacts"}}
})
def contacts_list():
    con = db()
    with con.cursor() as c:
        c.execute("SELECT * FROM contacts")
        return jsonify(c.fetchall())


@app.get("/contacts/<int:id_contact>")
@swag_from({
    "summary": "Détails d’un contact avec interactions + scoring",
    "tags": ["Contacts"],
    "parameters": [{
        "name": "id_contact",
        "in": "path",
        "required": True,
        "schema": {"type": "integer"}
    }],
    "responses": {200: {"description": "Détails du contact"}}
})
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


@app.post("/contacts")
@swag_from({
    "summary": "Créer un contact",
    "tags": ["Contacts"],
    "requestBody": {
        "required": True,
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "company_id": {"type": "integer"},
                        "firstname": {"type": "string"},
                        "lastname": {"type": "string"},
                        "email": {"type": "string"},
                        "phone": {"type": "string"},
                        "source": {"type": "string"},
                        "status_interaction": {"type": "string"}
                    }
                }
            }
        }
    },
    "responses": {200: {"description": "Contact créé"}}
})
def contact_create():
    data = request.json
    con = db()
    with con.cursor() as c:
        c.execute("""
            INSERT INTO contacts(company_id, firstname, lastname, email, phone, source, status_interaction)
            VALUES (%s,%s,%s,%s,%s,%s,%s)
        """, (
            data["company_id"],
            data["firstname"],
            data["lastname"],
            data["email"],
            data["phone"],
            data["source"],
            data["status_interaction"]
        ))
        con.commit()
    return jsonify({"message": "contact_created"})


# ----------------------------------------------------------
# 🧠 AGENT IA
# ----------------------------------------------------------
@app.post("/agent/analyze")
@swag_from({
    "summary": "Analyse via Azure IA",
    "tags": ["Agent IA"],
    "requestBody": {
        "required": True,
        "content": {
            "application/json": {
                "schema": {"type": "object", "properties": {"message": {"type": "string"}}}
            }
        }
    },
    "responses": {200: {"description": "Réponse IA"}}
})
def agent_analyze():
    data = request.get_json(force=True, silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Invalid JSON payload"}), 400

    message = data.get("message")
    return jsonify(call_agent(message))


# ----------------------------------------------------------
# 🏠 HOME
# ----------------------------------------------------------
@app.get("/")
def home():
    return {"status": "CRM API running", "version": "3.0", "swagger": "/docs"}


# ----------------------------------------------------------
# RUN
# ----------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3307, debug=True)
