---
description: SVTraders E-Commerce Website - Development & Deployment Workflow
---

# SVTraders E-Commerce Development Workflow

## 1. Initial Setup

Run the setup script to install all dependencies and configure the project:

```bash
bash scripts/setup.sh
```

This will:
- Check for Node.js and npm
- Install project dependencies
- Create required directories (public/images, public/css, public/js)
- Generate a `.env` file from the template if one doesn't exist

---

## 2. Environment Configuration

Edit the `.env` file with your actual credentials:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/svtraders
JWT_SECRET=your_jwt_secret_here
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 3. Start Development Server

// turbo
```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot-reload enabled.

---

## 4. Project Structure Overview

```
svtraders/
├── scripts/          # Bash scripts (setup, deploy, backup)
├── public/           # Static assets (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── views/            # EJS templates
├── routes/           # Express route handlers
├── models/           # Mongoose models
├── middleware/       # Auth & other middleware
├── .env.example      # Environment variable template
├── package.json      # Dependencies & scripts
└── server.js         # App entry point
```

---

## 5. Adding New Features

1. **Models** → Create Mongoose schema in `models/`
2. **Routes** → Add Express routes in `routes/`
3. **Views** → Create EJS templates in `views/`
4. **Static Assets** → Place in `public/css`, `public/js`, or `public/images`

---

## 6. Running Tests

```bash
npm test
```

---

## 7. Production Build & Deploy

Run the deploy script to prepare for production:

```bash
bash scripts/deploy.sh
```

---

## 8. Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Stage and commit changes
git add .
git commit -m "feat: description of your changes"

# Push to remote
git push origin feature/your-feature-name

# Merge to main after review
git checkout main
git merge feature/your-feature-name
git push origin main
```
