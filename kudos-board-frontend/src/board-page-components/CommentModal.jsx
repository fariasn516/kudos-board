import React, { useState } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CommentModal = ({ card, onClose, onCommentAdded }) => {
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return alert("Comment message is required");

    try {
      const res = await fetch(`${BACKEND_URL}/api/cards/${card.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, author: author || null })
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const newComment = await res.json();

      setBody("");
      setAuthor("");
      onCommentAdded(newComment);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <img src={card.gif} alt={card.title} />
        {card.author && <p><strong>Author:</strong> {card.author}</p>}
        <hr />
        <h3>Comments</h3>
        {card.comments?.length > 0 ? (
          card.comments.map((c) => (
            <div key={c.id} className="comment">
              <p>{c.body}</p>
              {c.author && <small>— {c.author}</small>}
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your name (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
