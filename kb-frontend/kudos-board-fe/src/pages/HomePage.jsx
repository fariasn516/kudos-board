import React from 'react';
import Header from '../components/Header';
import BoardList from '../components/BoardList';
import Footer from '../components/Footer';

const HomePage = () => {

  return (
    <div className="home-page">
      <Header />
      <BoardList />
      <Footer />
    </div>
  );
};

export default HomePage;
