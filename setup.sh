#!/bin/bash

# Actualizar el sistema
echo "Actualizando el sistema..."
apt-get update && apt-get upgrade -y

# Instalar dependencias necesarias
echo "Instalando LAMP stack y dependencias..."
apt-get install -y apache2 mariadb-server php php-mysql php-curl php-gd php-mbstring php-xml php-zip unzip curl composer git

# Instalar Node.js
echo "Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Configurar Apache
echo "Configurando Apache..."
a2enmod rewrite
systemctl restart apache2

# Configurar MariaDB
echo "Configurando base de datos..."
mysql -e "CREATE DATABASE hostcan;"
mysql -e "CREATE USER 'hostcan'@'localhost' IDENTIFIED BY 'hostcan123';"
mysql -e "GRANT ALL PRIVILEGES ON hostcan.* TO 'hostcan'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Crear directorios necesarios
echo "Creando directorios..."
mkdir -p /var/www/storage
mkdir -p /var/www/sites
chown -R www-data:www-data /var/www/storage /var/www/sites
chmod -R 755 /var/www/storage /var/www/sites

# Clonar y configurar el frontend
echo "Configurando frontend..."
cd /var/www/html
rm -rf *
git clone https://github.com/tu-usuario/hostcan.git .
npm install
npm run build

# Configurar el backend
echo "Configurando backend..."
cp backend/* /var/www/html/api/
cd /var/www/html/api
composer require firebase/php-jwt

# Importar esquema de base de datos
echo "Importando esquema de base de datos..."
mysql hostcan < backend/schema.sql

# Configurar virtual host
echo "Configurando virtual host..."
cat > /etc/apache2/sites-available/hostcan.conf << EOL
<VirtualHost *:80>
    ServerName hostcan.local
    DocumentRoot /var/www/html/dist
    
    <Directory /var/www/html/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        FallbackResource /index.html
    </Directory>

    Alias /api /var/www/html/api
    <Directory /var/www/html/api>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ index.php [QSA,L]
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/hostcan-error.log
    CustomLog \${APACHE_LOG_DIR}/hostcan-access.log combined
</VirtualHost>
EOL

# Activar el sitio
echo "Activando el sitio..."
a2dissite 000-default.conf
a2ensite hostcan.conf
systemctl restart apache2

# Configurar hosts
echo "Configurando /etc/hosts..."
echo "127.0.0.1 hostcan.local" >> /etc/hosts

echo "¡Instalación completada!"
echo "Accede a tu sitio en: http://hostcan.local"
echo "Usuario de base de datos: hostcan"
echo "Contraseña de base de datos: hostcan123"