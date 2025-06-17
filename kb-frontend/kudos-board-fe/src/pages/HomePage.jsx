import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortButtons from '../components/SortButtons';
import BoardList from '../components/BoardList';
import Footer from '../components/Footer';

const HomePage = () => {

  return (
    <div className="home-page">
      <Header />
      <SearchBar />
      <SortButtons />
      <BoardList />
      <Footer />
    </div>
  );
};

export default HomePage;
