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

  const sortCards = (list) => {
    return [...list].sort((a, b) => {
      if (a.pinned && b.pinned) {
        return new Date(b.pinnedAt) - new Date(a.pinnedAt);
      }
      if (a.pinned) return -1;
      if (b.pinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const fetchCards = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/boards/${board.id}/cards`);
      const data = await res.json();
      const newCards = sortCards(Array.isArray(data) ? data : data.cards);
      setCards(newCards);

      if (selectedCard) {
        const updated = newCards.find((c) => c.id === selectedCard.id);
        if (updated) setSelectedCard(updated);
      }
    } catch (err) {
      console.error("Failed to fetch cards:", err);
    }
  };

  const handleUpvote = async (id) => {
    const updatedCards = cards.map((c) =>
      c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c
    );
    setCards(sortCards(updatedCards));

    try {
      const updatedUpvotes = updatedCards.find((c) => c.id === id)?.upvotes || 1;
      await fetch(`${BACKEND_URL}/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upvotes: updatedUpvotes }),
      });
    } catch {
      fetchCards();
    }
  };

  const handlePinToggle = async (id, currentlyPinned) => {
    const now = new Date().toISOString();
    const updatedCards = cards.map((c) =>
      c.id === id
        ? {
          ...c,
          pinned: !currentlyPinned,
          pinnedAt: currentlyPinned ? null : now,
        }
        : c
    );
    setCards(sortCards(updatedCards));

    try {
      await fetch(`${BACKEND_URL}/api/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pinned: !currentlyPinned,
          pinnedAt: currentlyPinned ? null : now,
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

  const handleCommentClick = (card) => setSelectedCard(card);

  useEffect(() => {
    fetchCards();
  }, [board.id]);

  return (
    <div className="board-page">
      <Header />
      <main className="board-content">
        <div className="board-header">
          <Link to="/" className="back-home-link" title="Back to Home">🏠</Link>
          <div className="board-info">
            <h1 className="board-title">{board.title}</h1>
            <p className="board-category">{board.category}</p>
          </div>
          <AddCard onClick={() => setShowModal(true)} />
        </div>

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
