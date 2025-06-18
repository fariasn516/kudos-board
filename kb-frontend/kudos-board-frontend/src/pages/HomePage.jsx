import React from 'react';
import Header from '../home-page-components/Header';
import SearchBar from '../home-page-components/SearchBar';
import SortButtons from '../home-page-components/SortButtons';
import BoardList from '../home-page-components/BoardList';
import AddBoard from '../home-page-components/AddBoard';
import Footer from '../home-page-components/Footer';

const HomePage = () => {

  return (
    <div className="home-page">
      <Header />
      <SearchBar />
      <SortButtons />
      <AddBoard />
      <BoardList />
      <Footer />
    </div>
  );
};

export default HomePage;
