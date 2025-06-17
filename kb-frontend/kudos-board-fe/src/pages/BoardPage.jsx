import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BoardPage = () => {
    const {boardId} = useParams();

    return (
        <div className="board-page">
            <Header />
            <main className="board-content">
                <h1>Board {boardId}</h1>
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
