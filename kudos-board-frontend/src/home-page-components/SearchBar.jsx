import React from "react";
import '../App.css';

function SearchBar({ searchTitle, setSearchTitle, onSearch, onClear }) {
  return (
    <section className="search-form">
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search boards..."
          value={searchTitle}
          onChange={({ target }) => setSearchTitle(target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <button
          type="button"
          className="clear-button"
          onClick={onClear}
        >
          Clear
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
