import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BoardPage = ({ boardId }) => {
    return (
        <div className="board-page">
            <Header />
            <main className="board-content">
                <p>This is where individual board content will be displayed.</p>
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
