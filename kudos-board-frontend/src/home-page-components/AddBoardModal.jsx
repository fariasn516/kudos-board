import React, { useState } from 'react';
import '../App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddBoardModal = ({ onClose, onBoardCreated }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      alert("Title and category are required!");
      return;
    }

    const newBoard = {
      title,
      category,
      author: author || null
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/boards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBoard)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create board");
      }

      const created = await res.json();
      console.log("Board created:", created);

      onBoardCreated();
      onClose();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Create a New Board</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </label>

          <label>
            Category:
            <select
              value={category}
              onChange={({ target }) => setCategory(target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank You">Thank You</option>
              <option value="Inspiration">Inspiration</option>
            </select>
          </label>

          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>

          <button type="submit">Create Board</button>
        </form>
      </div>
    </div>
  );
};

export default AddBoardModal;
