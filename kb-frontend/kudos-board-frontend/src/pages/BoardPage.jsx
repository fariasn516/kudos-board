import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../home-page-components/Header';
import Footer from '../home-page-components/Footer';
import { Link } from 'react-router-dom';
import CardList from '../board-page-components/CardList';
import AddCard from '../board-page-components/AddCard';

const BoardPage = () => {
    const location = useLocation();
    const boardData = location.state;

    return (
        <div className="board-page">
            <Header />
            <main className="board-content">
                <div className='back-container'>
                    <Link to="/">Back to Home</Link>
                </div>
                <div className="board-details">
                    <h1>Board: {boardData.title}</h1>
                    <p>Category: {boardData.category}</p>
                </div>
                <AddCard />
                <CardList />
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
