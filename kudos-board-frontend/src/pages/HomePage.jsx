import React, { useState, useEffect } from 'react';
import Header from '../shared-components/Header';
import Footer from '../shared-components/Footer';
import SearchBar from '../home-page-components/SearchBar';
import SortButtons from '../home-page-components/SortButtons';
import BoardList from '../home-page-components/BoardList';
import AddBoard from '../home-page-components/AddBoard';
import AddBoardModal from '../home-page-components/AddBoardModal';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBoards = async (title = "", category = "All") => {
    let url = `${BACKEND_URL}/api/boards`;
    const params = [];

    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (category && category !== "All" && category !== "Recent") {
      params.push(`category=${encodeURIComponent(category)}`);
    }

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();

      const sortedBoards =
        category === "Recent"
          ? [...data]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6)
          : data;

      setBoards(sortedBoards);
    } catch (err) {
      console.error("Error fetching boards:", err);
      setBoards([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBoards(searchTitle, selectedCategory);
  };

  const clearSearch = () => {
    setSearchTitle("");
    fetchBoards("", selectedCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchBoards(searchTitle, category);
  };

  const handleDeleteBoard = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/boards/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { message } = await res.json().catch(() => ({}));
        throw new Error(message || `Request failed (${res.status})`);
      }

      fetchBoards(searchTitle, selectedCategory);
    } catch (err) {
      alert("Error deleting board: " + err.message);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="home-page">
      <Header />

      <SearchBar
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        onSearch={handleSearch}
        onClear={clearSearch}
      />

      <SortButtons
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <AddBoard onClick={() => setShowModal(true)} />

      {showModal && (
        <AddBoardModal
          onClose={() => setShowModal(false)}
          onBoardCreated={() => fetchBoards(searchTitle, selectedCategory)}
        />
      )}

      <BoardList boards={boards} onDelete={handleDeleteBoard} />

      <Footer />
    </div>
  );
};

export default HomePage;
