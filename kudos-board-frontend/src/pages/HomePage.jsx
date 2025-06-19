import React, { useState, useEffect } from 'react';
import Header from '../shared-components/Header';
import SearchBar from '../home-page-components/SearchBar';
import SortButtons from '../home-page-components/SortButtons';
import BoardList from '../home-page-components/BoardList';
import AddBoard from '../home-page-components/AddBoard';
import Footer from '../shared-components/Footer';

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBoards = (title = "", category = "All") => {
    let url = 'http://localhost:3000/api/boards';
    const params = [];

    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (category && category !== "All" && category !== "Recent") {
      params.push(`category=${encodeURIComponent(category)}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const sortedData = category === "Recent"
          ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : data;

        setBoards(sortedData);
      })
      .catch(err => {
        console.error("Error fetching boards:", err);
        setBoards([]);
      });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBoards(searchTitle, selectedCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchBoards(searchTitle, category);
  };

  return (
    <div className="home-page">
      <Header />
      <SearchBar
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        onSearch={handleSearch}
      />
      <SortButtons
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick} />
      <AddBoard />
      <BoardList boards={boards} />
      <Footer />
    </div>
  );
};

export default HomePage;
