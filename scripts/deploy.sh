#!/bin/bash
# ============================================
# SVTraders E-Commerce - Deploy Script
# Author: Akash Dhar Dubey
# Date: March 2026
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "=========================================="
echo "  SVTraders - Production Deploy"
echo "=========================================="
echo ""

# ------------------------------------------
# 1. Pre-flight checks
# ------------------------------------------
echo -e "${YELLOW}[1/4]${NC} Running pre-flight checks..."

if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Run setup.sh first.${NC}"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo -e "${RED}Error: .env file not found. Run setup.sh first.${NC}"
    exit 1
fi

echo -e "  ${GREEN}✓${NC} All checks passed"

# ------------------------------------------
# 2. Install production dependencies
# ------------------------------------------
echo -e "${YELLOW}[2/4]${NC} Installing production dependencies..."
npm ci --production 2>/dev/null || npm install --production
echo -e "  ${GREEN}✓${NC} Dependencies installed"

# ------------------------------------------
# 3. Set environment to production
# ------------------------------------------
echo -e "${YELLOW}[3/4]${NC} Configuring production environment..."
export NODE_ENV=production
echo -e "  ${GREEN}✓${NC} NODE_ENV set to production"

# ------------------------------------------
# 4. Start application
# ------------------------------------------
echo -e "${YELLOW}[4/4]${NC} Starting SVTraders server..."
echo ""
echo "=========================================="
echo -e "  ${GREEN}Deploying in production mode...${NC}"
echo "=========================================="
echo ""

node server.js
