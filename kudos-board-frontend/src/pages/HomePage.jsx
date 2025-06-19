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

  const fetchBoards = (title = "") => {
    let url = 'http://localhost:3000/api/boards';
    if (title) {
      url += `?title=${encodeURIComponent(title)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then(setBoards)
      .catch((err) => {
        console.error("Error fetching boards:", err);
        setBoards([]);
      });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBoards(searchTitle);
  };

  return (
    <div className="home-page">
      <Header />
      <SearchBar
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        onSearch={handleSearch}
      />
      <SortButtons />
      <AddBoard onClick={() => setShowModal(true)} />
      {showModal && (
        <AddBoardModal
          onClose={() => setShowModal(false)}
          onBoardCreated={() => fetchBoards(searchTitle, selectedCategory)}
        />
      )}
      <BoardList boards={boards} />
      <Footer />
    </div>
  );
};

export default HomePage;
