import React, { useState } from "react";
import "../App.css";
const BACKEND_URL = import.meta.env.VITE_API_KEY;

const AddCardModal = ({ boardId, onClose, onCardCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const handleGifSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const key = import.meta.env.VITE_API_KEY;
      const url =
        `https://api.giphy.com/v1/gifs/search?` +
        `api_key=${key}&q=${encodeURIComponent(searchTerm)}` +
        `&limit=6&rating=g`;
      const res = await fetch(url);
      const json = await res.json();
      setResults(json.data || []);
    } catch (err) {
      console.error("GIPHY search failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !selectedGif) return;

    const newCard = {
      title,
      description,
      gif: selectedGif,
      author: author || null,
    };

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCard),
        }
      );
      if (!res.ok) throw new Error("Failed to create card");

      await res.json();
      onCardCreated();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Create a New Card</h2>

        <form onSubmit={handleSubmit} className="card-form">
          <label>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>

          <label>
            Description:
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Author:
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>

          <label>
            GIF search:
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. celebration"
            />
          </label>
          <button onClick={handleGifSearch} className="gif-search-button">
            Search GIFs
          </button>

          {results.length > 0 && (
            <div className="gif-grid">
              {results.map((gif) => {
                const url = gif.images.fixed_height_small.url;
                return (
                  <img
                    key={gif.id}
                    src={url}
                    alt={gif.title}
                    className={
                      url === selectedGif ? "gif-thumb selected" : "gif-thumb"
                    }
                    onClick={() => setSelectedGif(url)}
                  />
                );
              })}
            </div>
          )}

          {selectedGif && (
            <>
              <p>Selected GIF preview:</p>
              <img src={selectedGif} alt="selected gif" className="gif-preview" />
            </>
          )}

          <button type="submit" disabled={!selectedGif}>
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
