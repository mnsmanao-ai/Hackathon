# Base image
FROM python:3.12-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers
COPY requirements.txt .
COPY test_mysql.py .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Commande par défaut
CMD ["python", "test_mysql.py"]