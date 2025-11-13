FROM python:3.11-slim

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Création du dossier de l’API
WORKDIR /app

# Copier les fichiers Python
COPY requirements.txt /app/
COPY . /app/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port Flask
EXPOSE 3307

# Lancer l’API
CMD ["python", "main.py"]
