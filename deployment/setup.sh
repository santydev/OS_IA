#!/bin/bash

# Installation des dépendances
apt update && apt upgrade -y
apt install -y nginx postgresql-15 nodejs npm certbot python3-certbot-nginx

# Configuration de Node.js
npm install -g pm2

# Configuration de PostgreSQL
sudo -u postgres createuser os_ia
sudo -u postgres createdb os_ia_prod
sudo -u postgres psql -c "ALTER USER os_ia WITH PASSWORD 'SECURE_PASSWORD';"

# Configuration de Nginx
cat > /etc/nginx/sites-available/os-ia << 'EOL'
server {
    listen 80;
    server_name os-ia.com www.os-ia.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

ln -s /etc/nginx/sites-available/os-ia /etc/nginx/sites-enabled/