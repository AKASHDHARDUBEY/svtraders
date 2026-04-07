#!/bin/bash
# ──────────────────────────────────────────────────────────────────
# SV Traders — Full Deployment Script for EC2
# Run this ON YOUR EC2 INSTANCE as root/sudo
# Usage: sudo bash setup-server.sh
# ──────────────────────────────────────────────────────────────────

set -e

APP_DIR="/home/ubuntu/svtraders"
WEB_ROOT="/var/www/sv-traders.in"
DOMAIN="sv-traders.in"

echo "🚀 Starting SV Traders deployment..."

# ── 1. System updates ──────────────────────────────────────────
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# ── 2. Install Node.js 18 ──────────────────────────────────────
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi
echo "✅ Node $(node -v)"

# ── 3. Install Nginx ───────────────────────────────────────────
echo "📦 Installing Nginx..."
apt install -y nginx
systemctl enable nginx

# ── 4. Install PM2 ─────────────────────────────────────────────
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# ── 5. Clone / Pull code ───────────────────────────────────────
if [ ! -d "$APP_DIR" ]; then
    echo "📥 Clone your repo first:"
    echo "   git clone https://github.com/YOUR_USERNAME/svtraders.git $APP_DIR"
    echo "   Then re-run this script."
    exit 1
fi

cd "$APP_DIR"
git pull origin main

# ── 6. Install dependencies ────────────────────────────────────
echo "📦 Installing server dependencies..."
cd "$APP_DIR/server"
npm install --production

echo "📦 Installing client dependencies..."
cd "$APP_DIR/client"
npm install

# ── 7. Build React app ─────────────────────────────────────────
echo "🔨 Building React frontend..."
npm run build

# ── 8. Deploy build to web root ────────────────────────────────
echo "📂 Copying build to $WEB_ROOT..."
rm -rf "$WEB_ROOT"
mkdir -p "$WEB_ROOT"
cp -r "$APP_DIR/client/build/"* "$WEB_ROOT/"

# ── 9. Setup Nginx config ──────────────────────────────────────
echo "⚙️ Configuring Nginx..."
cp "$APP_DIR/nginx/sv-traders.in.conf" /etc/nginx/sites-available/sv-traders.in

# For initial setup (before SSL), use a temporary HTTP-only config
if [ ! -f /etc/letsencrypt/live/sv-traders.in/fullchain.pem ]; then
    echo "⚠️ SSL not yet configured. Creating temporary HTTP-only config..."
    cat > /etc/nginx/sites-available/sv-traders.in << 'TEMP_CONF'
server {
    listen 80;
    server_name sv-traders.in www.sv-traders.in;

    root /var/www/sv-traders.in;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
TEMP_CONF
fi

ln -sf /etc/nginx/sites-available/sv-traders.in /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
echo "✅ Nginx configured!"

# ── 10. Start Express with PM2 ─────────────────────────────────
echo "🚀 Starting Express server with PM2..."
cd "$APP_DIR/server"
pm2 delete sv-traders 2>/dev/null || true
pm2 start app.js --name sv-traders
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null || true

echo ""
echo "══════════════════════════════════════════════════════════════"
echo "✅ SV Traders deployed successfully!"
echo ""
echo "   🌐 http://$DOMAIN"
echo ""
echo "══════════════════════════════════════════════════════════════"
echo ""
echo "📌 NEXT STEP — Install SSL (HTTPS):"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d sv-traders.in -d www.sv-traders.in"
echo ""
echo "   Then copy the full Nginx config:"
echo "   sudo cp $APP_DIR/nginx/sv-traders.in.conf /etc/nginx/sites-available/sv-traders.in"
echo "   sudo nginx -t && sudo systemctl reload nginx"
echo ""
