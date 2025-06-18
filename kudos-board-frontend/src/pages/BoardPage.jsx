import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../home-page-components/Header';
import Footer from '../home-page-components/Footer';
import { Link } from 'react-router-dom';
import CardList from '../board-page-components/CardList';
import AddCard from '../board-page-components/AddCard';

const BoardPage = () => {
    const location = useLocation();
    const boardData = location.state;
    const [cards, setCards] = useState([]);

      useEffect(() => {
        fetch(`http://localhost:3000/api/boards/${boardData.id}/cards`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Cards:', data);
            setCards(data);
          })
          .catch(error => {
            console.error('Error fetching cards:', error);
          });
      }, []);


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
                <CardList cards={cards} />
            </main>
            <Footer />
        </div>
    );
};

export default BoardPage;
