import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../shared-components/Header';
import Footer from '../shared-components/Footer';
import { Link } from 'react-router-dom';
import CardList from '../board-page-components/CardList';
import AddCard from '../board-page-components/AddCard';

const BoardPage = () => {
  const location = useLocation();
  const boardData = location.state;
  const [cards, setCards] = useState([]);

  const handleUpvote = async (cardId) => {
    const prevCards = cards;
    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, upvotes: c.upvotes + 1 } : c
    );
    setCards(newCards);

    const updatedCard = newCards.find((c) => c.id === cardId);

    try {
      const res = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upvotes: updatedCard.upvotes }),
      });

      if (!res.ok) throw new Error();

      const result = await res.json();
      setCards((prev) => prev.map((c) => (c.id === cardId ? result : c)));
    } catch {
      setCards(prevCards);
      alert("Failed to upvote");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/boards/${boardData.id}/cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Cards:', data);
        setCards(data);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  }, [boardData.id]);

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
        <CardList cards={cards} onUpvote={handleUpvote} />
      </main>
      <Footer />
    </div>
  );
};

export default BoardPage;
