import React from "react";
import "./SearchBar.css";

function SearchBar({ setSearch, search }) {
  return (
    <div className="searchbar-wrap">
      <span className="search-icon">🔍</span>
      <input
        id="product-search-input"
        type="text"
        className="searchbar-input"
        placeholder="Search products, categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          className="clear-btn"
          id="clear-search-btn"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
