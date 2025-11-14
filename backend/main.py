from flask import Flask, request, jsonify
import pymysql
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from flasgger import Swagger, swag_from
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from flask_bcrypt import check_password_hash, generate_password_hash

SECRET_KEY = "96893dad878d8b0a5df57de1f022ceee159a2c8a2284396a09a6cee116ac4e40"  # mettre en variable d'environnement en prod

app = Flask(__name__)

CORS(app)
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


from functools import wraps
from flask import request

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Token manquant"}), 401

        try:
            token = auth_header.split(" ")[1]  # "Bearer <token>"
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            kwargs['current_user_id'] = payload['user_id']  # On peut utiliser l'id utilisateur
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expiré"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token invalide"}), 401

        return f(*args, **kwargs)
    return decorated


# ----------------------------------------------------------
# 🤖 AZURE AGENT
# ----------------------------------------------------------
project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://gestionprospect1234567-resource.services.ai.azure.com/api/projects/Gestionprospect1234567"
)

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
def users_create():
    data = request.json
    con = db()

    # Vérifie que tous les champs requis sont présents
    required_fields = ["firstname", "lastname", "email", "password", "phone"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} manquant"}), 400

    # Hash du mot de passe
    hashed_password = generate_password_hash(data["password"]).decode("utf-8")

    with con.cursor() as c:
        c.execute("""
            INSERT INTO users(firstname, lastname, email, password_hash, phone, active)
            VALUES (%s,%s,%s,%s,%s,%s)
        """, (
            data["firstname"],
            data["lastname"],
            data["email"],
            hashed_password,
            data["phone"],
            data.get("active", True),
        ))
        con.commit()
    return jsonify({"message": "user_created"})


# ----------------------------------------------------------
# 👥 CONTACTS (exemple complet)
# ----------------------------------------------------------
@app.get("/contacts")
@token_required
@swag_from({
    "summary": "Liste complète des contacts",
    "tags": ["Contacts"],
    "responses": {200: {"description": "Liste des contacts"}}
})
def contacts_list(current_user_id):
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
    message = request.json.get("message")
    return jsonify(call_agent(message))


@app.post("/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email ou mot de passe manquant"}), 400

    con = db()
    with con.cursor() as c:
        c.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = c.fetchone()
        if not user:
            return jsonify({"error": "Utilisateur non trouvé"}), 401

        # Vérifie le mot de passe
        if not check_password_hash(user["password_hash"], password):
            return jsonify({"error": "Mot de passe incorrect"}), 401

        # Génère le JWT
        payload = {
            "user_id": user["id_user"],
            "exp": datetime.utcnow() + timedelta(hours=2)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "token": token,
            "user": {
                "id": user["id_user"],
                "firstname": user["firstname"],
                "lastname": user["lastname"],
                "email": user["email"]
            }
        })

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
