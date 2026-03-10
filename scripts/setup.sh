#!/bin/bash
# ============================================
# SVTraders E-Commerce - Project Setup Script
# Author: Akash Dhar Dubey
# Date: March 2026
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "=========================================="
echo "  SVTraders - E-Commerce Setup"
echo "=========================================="
echo ""

# ------------------------------------------
# 1. Check Node.js
# ------------------------------------------
echo -e "${YELLOW}[1/5]${NC} Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "  ${GREEN}✓${NC} Node.js ${NODE_VERSION} found"

# ------------------------------------------
# 2. Check npm
# ------------------------------------------
echo -e "${YELLOW}[2/5]${NC} Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "  ${GREEN}✓${NC} npm v${NPM_VERSION} found"

# ------------------------------------------
# 3. Install dependencies
# ------------------------------------------
echo -e "${YELLOW}[3/5]${NC} Installing project dependencies..."
if [ -f "package.json" ]; then
    npm install
    echo -e "  ${GREEN}✓${NC} Dependencies installed"
else
    echo -e "  ${YELLOW}⚠${NC}  No package.json found, initializing project..."
    npm init -y
    npm install express mongoose ejs dotenv bcryptjs jsonwebtoken cookie-parser multer
    npm install --save-dev nodemon
    echo -e "  ${GREEN}✓${NC} Project initialized and dependencies installed"
fi

# ------------------------------------------
# 4. Create directory structure
# ------------------------------------------
echo -e "${YELLOW}[4/5]${NC} Creating project directories..."

DIRS=("public/css" "public/js" "public/images" "views" "routes" "models" "middleware")

for dir in "${DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo -e "  ${GREEN}✓${NC} Created ${dir}/"
    else
        echo -e "  ${GREEN}✓${NC} ${dir}/ already exists"
    fi
done

# ------------------------------------------
# 5. Setup environment file
# ------------------------------------------
echo -e "${YELLOW}[5/5]${NC} Setting up environment variables..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "  ${GREEN}✓${NC} Created .env from .env.example"
    else
        cat > .env << 'EOF'
# SVTraders Environment Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/svtraders

# JWT Authentication
JWT_SECRET=change_this_to_a_strong_secret_key
JWT_EXPIRES_IN=7d

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EOF
        echo -e "  ${GREEN}✓${NC} Created .env with default values"
    fi
    echo -e "  ${YELLOW}⚠${NC}  Remember to update .env with your actual credentials!"
else
    echo -e "  ${GREEN}✓${NC} .env already exists"
fi

# ------------------------------------------
# Create .env.example if it doesn't exist
# ------------------------------------------
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/svtraders
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EOF
    echo -e "  ${GREEN}✓${NC} Created .env.example template"
fi

# ------------------------------------------
# Create .gitignore if needed
# ------------------------------------------
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
dist/
coverage/
EOF
    echo -e "  ${GREEN}✓${NC} Created .gitignore"
fi

echo ""
echo "=========================================="
echo -e "  ${GREEN}Setup complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Edit .env with your credentials"
echo "  2. Start MongoDB (if using local)"
echo "  3. Run: npm run dev"
echo ""
