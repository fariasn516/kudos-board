import React from "react";
import '../App.css';

function SortButtons() {
  return (
    <section className="sort-buttons">
      <button className="sort-button">All</button>
      <button className="sort-button">Recent</button>
      <button className="sort-button">Celebration</button>
      <button className="sort-button">Thank You</button>
      <button className="sort-button">Inspiration</button>
    </section>
  );
}

export default SortButtons;
