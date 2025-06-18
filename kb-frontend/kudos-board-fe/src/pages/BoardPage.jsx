import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const BoardPage = () => {
    const location = useLocation();
    const boardData = location.state;

    return (
        <div className="board-page">
            <Header />
            <main className="board-content">
                <h1>Board: {boardData.title}</h1>
                <p>Category: {boardData.category}</p>
                <Link to="/">Back to Home</Link>
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
