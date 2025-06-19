import React, { useState } from "react";
import '../App.css';

function SearchBar({ searchTitle, setSearchTitle, onSearch }) {
  return (
    <section className="search-form">
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search boards..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
        <button
          type="button"
          className="clear-button"
          onClick={() => {
            setSearchTitle("");
            onSearch({ preventDefault: () => { } });
          }}
        >
          Clear
        </button>
      </form>
    </section>
  );
}


export default SearchBar;
