# Étape 1 : Build
FROM node:20-alpine AS build
WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm install

# Copie du reste
COPY . .

# Build Vite
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html