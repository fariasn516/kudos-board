import React, { useState } from "react";
import '../App.css';

function SearchBar() {
  return (
    <section className="search-form">
      <form>
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search boards..."
        />
        <button type="submit" className="search-button">Search</button>
        <button className="clear-button">Clear</button>
      </form>
    </section>
  );
}

export default SearchBar;
