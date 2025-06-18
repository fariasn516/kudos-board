import React, { useState, useEffect } from 'react';
import Header from '../home-page-components/Header';
import SearchBar from '../home-page-components/SearchBar';
import SortButtons from '../home-page-components/SortButtons';
import BoardList from '../home-page-components/BoardList';
import AddBoard from '../home-page-components/AddBoard';
import Footer from '../home-page-components/Footer';

const HomePage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/boards')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Boards:', data);
        setBoards(data);
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
  }, []);


  return (
    <div className="home-page">
      <Header />
      <SearchBar />
      <SortButtons />
      <AddBoard />
      <BoardList boards={boards}/>
      <Footer />
    </div>
  );
};

export default HomePage;
