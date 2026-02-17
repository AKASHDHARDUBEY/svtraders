import React, { useEffect, useState, useCallback } from "react";
import { getProducts, getCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import "./Products.css";

function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("default");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(search, activeCategory);
      setProducts(data);
    } catch (err) {
      setError("Could not load products. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="products-section" id="products">
      <div className="products-inner">
        <div className="products-header">
          <h2 className="products-title">
            Our <span className="highlight">Products</span>
          </h2>
          <p className="products-subtitle">
            Explore our wide range of electrical and plumbing supplies
          </p>
        </div>

        {/* Search + Sort */}
        <div className="products-controls">
          <SearchBar setSearch={setSearch} search={search} />
          <select
            className="sort-select"
            id="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="category-filters" id="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result Count */}
        {!loading && (
          <p className="result-count">
            {sorted.length} product{sorted.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="loading-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="skeleton-card" key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="error-state">
            <span>⚠️</span>
            <p>{error}</p>
            <button onClick={fetchProducts} id="retry-btn">Retry</button>
          </div>
        )}

        {!loading && !error && sorted.length === 0 && (
          <div className="empty-state">
            <span>🔍</span>
            <p>No products found for "<strong>{search}</strong>"</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }} id="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && sorted.length > 0 && (
          <div className="products-grid">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
