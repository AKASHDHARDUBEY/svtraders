const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ── Product Data ──────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "LED Slim Panel Light",
    category: "Lighting",
    price: 349,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Heavy Duty Electric Switch",
    category: "Switches",
    price: 85,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    rating: 4.2,
    reviews: 74,
    inStock: true,
    badge: null,
  },
  {
    id: 3,
    name: "Copper Wiring Cable (10m)",
    category: "Wiring",
    price: 420,
    originalPrice: 550,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    rating: 4.7,
    reviews: 210,
    inStock: true,
    badge: "Top Rated",
  },
  {
    id: 4,
    name: "MCB Circuit Breaker",
    category: "Safety",
    price: 199,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
    rating: 4.8,
    reviews: 305,
    inStock: true,
    badge: "New",
  },
  {
    id: 5,
    name: "PVC Conduit Pipe (3m)",
    category: "Pipes",
    price: 65,
    originalPrice: 90,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80",
    rating: 4.0,
    reviews: 56,
    inStock: false,
    badge: null,
  },
  {
    id: 6,
    name: "5-Pin Power Socket",
    category: "Switches",
    price: 145,
    originalPrice: 195,
    image: "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&q=80",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    badge: null,
  },
  {
    id: 7,
    name: "Smart LED Bulb 9W",
    category: "Lighting",
    price: 220,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=400&q=80",
    rating: 4.6,
    reviews: 175,
    inStock: true,
    badge: "Smart",
  },
  {
    id: 8,
    name: "Waterproof CPVC Pipe (2m)",
    category: "Plumbing",
    price: 110,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=80",
    rating: 4.1,
    reviews: 43,
    inStock: true,
    badge: null,
  },
  {
    id: 9,
    name: "Modular Electrical Box",
    category: "Safety",
    price: 550,
    originalPrice: 720,
    image: "https://images.unsplash.com/photo-1606861594919-53e72b4e7944?w=400&q=80",
    rating: 4.9,
    reviews: 260,
    inStock: true,
    badge: "Premium",
  },
  {
    id: 10,
    name: "Digital Energy Meter",
    category: "Safety",
    price: 780,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
    rating: 4.4,
    reviews: 112,
    inStock: true,
    badge: "Deal",
  },
  {
    id: 11,
    name: "Exhaust Fan 6-inch",
    category: "Ventilation",
    price: 480,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=400&q=80",
    rating: 4.2,
    reviews: 68,
    inStock: true,
    badge: null,
  },
  {
    id: 12,
    name: "Tap Faucet (Chrome)",
    category: "Plumbing",
    price: 295,
    originalPrice: 400,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
    rating: 4.5,
    reviews: 95,
    inStock: false,
    badge: null,
  },
];

// ── Routes ──────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "SV Traders API running ⚡" });
});

app.get("/products", (req, res) => {
  const { search, category } = req.query;
  let result = [...products];

  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  res.json(result);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.get("/categories", (req, res) => {
  const cats = ["All", ...new Set(products.map((p) => p.category))];
  res.json(cats);
});

// ── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ SV Traders server running at http://localhost:${PORT}`);
});
