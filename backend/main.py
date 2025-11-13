from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pymysql
import os

app = FastAPI(title="Hackathon CRM API")

# Autoriser ton frontend à faire des requêtes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # à restreindre ensuite à ton domaine
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config BDD via variables d'environnement
DB_HOST = os.getenv("DB_HOST", "mysql")
DB_USER = os.getenv("DB_USER", "hackaton")
DB_PASSWORD = "#cfvPQcp%Fi2K0"
DB_NAME = os.getenv("DB_NAME", "crm_hackathon")
DB_PORT = int(os.getenv("DB_PORT", "3306"))

def get_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        port=DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

@app.get("/")
def root():
    return {"message": "API Hackathon CRM is running 🚀"}

@app.get("/contacts")
def get_contacts():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM contacts")
            result = cursor.fetchall()
        conn.close()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/contacts/{contact_id}")
def get_contact(contact_id: int):
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM contacts WHERE id_contact = %s", (contact_id,))
            result = cursor.fetchone()
        conn.close()
        if not result:
            raise HTTPException(status_code=404, detail="Contact not found")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
