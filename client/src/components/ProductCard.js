import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(product.rating)) return "★";
    if (i < product.rating) return "½";
    return "☆";
  });

  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`} id={`product-${product.id}`}>
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        {product.badge && <span className="card-badge">{product.badge}</span>}
        {discount > 0 && <span className="card-discount">-{discount}%</span>}
        {!product.inStock && <div className="card-overlay">Out of Stock</div>}
      </div>

      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.name}</h3>

        <div className="card-rating">
          <span className="stars">{stars.join("")}</span>
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="card-pricing">
          <span className="card-price">₹{product.price}</span>
          {product.originalPrice && (
            <span className="card-original">₹{product.originalPrice}</span>
          )}
        </div>

        <button
          className={`add-to-cart-btn ${added ? "added" : ""} ${!product.inStock ? "disabled" : ""}`}
          onClick={handleAdd}
          disabled={!product.inStock}
          id={`add-cart-${product.id}`}
        >
          {added ? "✓ Added!" : product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
