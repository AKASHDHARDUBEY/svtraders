import React from "react";
import "./Home.css";

const features = [
  { icon: "⚡", title: "Electrical", desc: "Switches, wiring, MCBs, and more" },
  { icon: "🔧", title: "Plumbing", desc: "Pipes, faucets, fittings & tools" },
  { icon: "💡", title: "Lighting", desc: "LED panels, bulbs, and smart lights" },
  { icon: "🛡️", title: "Safety", desc: "Circuit breakers and safety gear" },
];

function Home() {
  return (
    <section className="home" id="home">
      {/* Hero */}
      <div className="hero">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-content">
          <span className="hero-chip">⚡ Trusted Since 2010</span>
          <h1 className="hero-title">
            Your One-Stop Shop for<br />
            <span className="gradient-text">Electrical &amp; Plumbing</span>
          </h1>
          <p className="hero-subtitle">
            Premium quality products at unbeatable prices. Browse 1000+ items
            from top brands, delivered right to your doorstep.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary" id="hero-shop-btn">
              Shop Now →
            </a>
            <a href="#about" className="btn-secondary" id="hero-about-btn">
              Learn More
            </a>
          </div>
        </div>

        {/* Animated stats */}
        <div className="hero-stats">
          {[["1000+", "Products"], ["500+", "Customers"], ["12+", "Years"], ["4.8★", "Rating"]].map(([val, label]) => (
            <div className="stat-item" key={label}>
              <span className="stat-val">{val}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="features" id="about">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title} id={`feature-${f.title.toLowerCase()}`}>
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
