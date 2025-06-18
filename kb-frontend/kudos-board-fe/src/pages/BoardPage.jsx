import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import CardList from '../components/CardList';

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
                <CardList />
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
