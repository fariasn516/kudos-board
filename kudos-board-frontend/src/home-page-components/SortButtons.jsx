import React from "react";
import '../App.css';

const categories = ["All", "Recent", "Celebration", "Thank You", "Inspiration"];

function SortButtons({ selectedCategory, onCategoryClick }) {
  return (
    <section className="sort-buttons">
      {categories.map((category) => (
        <button
          key={category}
          className={`sort-button ${selectedCategory === category ? "active" : ""}`}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}

export default SortButtons;
