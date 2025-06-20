import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../shared-components/Header';
import Footer from '../shared-components/Footer';
import CardList from '../board-page-components/CardList';
import AddCard from '../board-page-components/AddCard';
import AddCardModal from '../board-page-components/AddCardModal';

const BoardPage = () => {
  const { state: board } = useLocation();
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCards = () =>
    fetch(`http://localhost:3000/api/boards/${board.id}/cards`)
      .then((r) => r.json())
      .then((data) =>
        setCards(Array.isArray(data) ? data : data.cards)
      )
      .catch(console.error);

  const handleUpvote = async (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
    try {
      await fetch(`http://localhost:3000/api/cards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upvotes: cards.find(c => c.id === id).upvotes + 1 })
      });
    } catch {
      fetchCards();
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/cards/${id}`, { method: 'DELETE' });
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchCards();
  }, [board.id]);

  return (
    <div className="board-page">
      <Header />
      <main className="board-content">
        <Link to="/"> Back to Home</Link>
        <h1>{board.title}</h1>
        <p>Category: {board.category}</p>
        <AddCard onClick={() => setShowModal(true)} />
        {showModal && (
          <AddCardModal
            boardId={board.id}
            onClose={() => setShowModal(false)}
            onCardCreated={fetchCards}
          />
        )}
        <CardList
          cards={cards}
          onUpvote={handleUpvote}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
};

export default BoardPage;
