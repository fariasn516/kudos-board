import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../shared-components/Header';
import Footer from '../shared-components/Footer';
import CardList from '../board-page-components/CardList';
import AddCard from '../board-page-components/AddCard';
import AddCardModal from '../board-page-components/AddCardModal';
import CommentModal from '../board-page-components/CommentModal';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BoardPage = () => {
  const { state: board } = useLocation();
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const sortCards = (list) =>
    [...list].sort((a, b) => {
      if (a.pinned && b.pinned) {
        return new Date(b.pinnedAt) - new Date(a.pinnedAt);
      }
      if (a.pinned) return -1;
      if (b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const fetchCards = () =>
    fetch(`${BACKEND_URL}/api/boards/${board.id}/cards`)
      .then((r) => r.json())
      .then((data) => {
        const newCards = sortCards(Array.isArray(data) ? data : data.cards);
        setCards(newCards);

        if (selectedCard) {
          const updatedCard = newCards.find(card => card.id === selectedCard.id);
          if (updatedCard) {
            setSelectedCard(updatedCard);
          }
        }
      })
      .catch(console.error);

  const handleUpvote = async (id) => {
    setCards((prev) =>
      sortCards(prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c)))
    );

    try {
      await fetch(`${BACKEND_URL}/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upvotes: cards.find((c) => c.id === id).upvotes + 1,
        }),
      });
    } catch {
      fetchCards();
    }
  };

  const handleCommentClick = (card) => {
    setSelectedCard(card);
  };

  const handlePinToggle = async (id, currentlyPinned) => {
    const now = new Date().toISOString();
    setCards((prev) =>
      sortCards(
        prev.map((c) =>
          c.id === id
            ? {
              ...c,
              pinned: !currentlyPinned,
              pinnedAt: currentlyPinned ? null : now,
            }
            : c
        )
      )
    );

    try {
      await fetch(`${BACKEND_URL}/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pinned: !currentlyPinned,
          pinnedAt: currentlyPinned ? null : now
        }),
      });
    } catch {
      fetchCards();
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/api/cards/${id}`, { method: 'DELETE' });
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
          onPinToggle={handlePinToggle}
          onDelete={handleDelete}
          onCommentClick={handleCommentClick}
        />
        {selectedCard && (
          <CommentModal
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            onCommentAdded={fetchCards}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BoardPage;
