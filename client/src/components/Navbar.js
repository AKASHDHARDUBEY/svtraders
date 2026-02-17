import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <div className="brand-text">
            <span className="brand-name">SV Traders</span>
            <span className="brand-tagline">Electrical &amp; Plumbing</span>
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#products" onClick={() => setMenuOpen(false)}>Products</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="cart-btn" id="cart-button">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="hamburger"
            id="hamburger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
