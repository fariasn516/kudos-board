import React, { useState, useEffect } from 'react';
import Header from '../shared-components/Header';
import SearchBar from '../home-page-components/SearchBar';
import SortButtons from '../home-page-components/SortButtons';
import BoardList from '../home-page-components/BoardList';
import AddBoard from '../home-page-components/AddBoard';
import Footer from '../shared-components/Footer';
import AddBoardModal from '../home-page-components/AddBoardModal';

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const handleDeleteBoard = async (id) => {
    console.log("Deleting board id:", id);
    try {
      const res = await fetch(`http://localhost:3000/api/boards/${id}`, {
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
      <AddBoard onClick={() => setShowModal(true)} />
      {showModal && (
        <AddBoardModal
          onClose={() => setShowModal(false)}
          onBoardCreated={() => fetchBoards(searchTitle, selectedCategory)}
        />
      )}
      <BoardList boards={boards} onDelete={handleDeleteBoard}/>
      <Footer />
    </div>
  );
};

export default HomePage;
