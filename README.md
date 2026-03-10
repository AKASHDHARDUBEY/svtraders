# SVTraders - E-Commerce Website

An e-commerce platform for SV Traders built with Node.js, Express, and MongoDB.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/AKASHDHARDUBEY/svtraders.git
cd svtraders

# Run the setup script
bash scripts/setup.sh

# Start the development server
npm run dev
```

## Project Structure

```
svtraders/
├── scripts/          # Setup & deploy bash scripts
├── public/           # Static assets (CSS, JS, images)
├── views/            # EJS templates
├── routes/           # Express route handlers
├── models/           # Mongoose data models
├── middleware/       # Auth & utility middleware
├── server.js         # App entry point
└── .env.example      # Environment variable template
```

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/setup.sh` | Install dependencies, scaffold directories, create env config |
| `scripts/deploy.sh` | Pre-flight checks and production deployment |

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Templates:** EJS
- **Auth:** JWT + bcrypt
- **Payments:** Razorpay

## License

MIT © Akash Dhar Dubey
