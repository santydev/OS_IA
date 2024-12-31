#!/bin/bash
set -e

# Installation des prérequis
apt update && apt upgrade -y
apt install -y docker.io docker-compose curl

# Configuration de Docker
systemctl enable docker
systemctl start docker

# Création des répertoires nécessaires
mkdir -p nginx/conf.d nginx/ssl nginx/www prometheus

# Génération des certificats SSL auto-signés (à remplacer par Let's Encrypt en production)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/os-ia.com.key \
  -out nginx/ssl/os-ia.com.crt \
  -subj "/CN=os-ia.com"

# Démarrage des services
docker-compose up -d

# Installation de Certbot pour SSL
apt install -y certbot python3-certbot-nginx
certbot --nginx -d os-ia.com -d www.os-ia.com --non-interactive --agree-tos -m admin@os-ia.com

echo "Installation terminée avec succès!"