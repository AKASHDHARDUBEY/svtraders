#!/bin/bash
# ──────────────────────────────────────────────────────────────────
# SV Traders — Quick Re-deploy (run after code push)
# Usage: bash deploy.sh
# ──────────────────────────────────────────────────────────────────

set -e

APP_DIR="/home/ubuntu/svtraders"
WEB_ROOT="/var/www/sv-traders.in"

cd "$APP_DIR"
git pull origin main

# Rebuild frontend
cd "$APP_DIR/client"
npm install
npm run build
sudo rm -rf "$WEB_ROOT"/*
sudo cp -r build/* "$WEB_ROOT/"

# Restart backend
cd "$APP_DIR/server"
npm install --production
pm2 restart sv-traders

echo "✅ SV Traders re-deployed!"
