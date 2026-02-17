import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="app">
      <Navbar cartCount={totalItems} />
      <main>
        <Home />
        <Products onAddToCart={handleAddToCart} />
      </main>
      <footer id="contact">
        <p>
          © 2024 <span>SV Traders</span> — Electrical &amp; Plumbing Supplies &nbsp;|&nbsp;
          Made with ❤️ in India
        </p>
      </footer>
    </div>
  );
}

export default App;
