import React, { useState } from 'react';
import '../App.css';

const AddCardModal = ({ boardId, onClose, onCardCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");

    const GIF_PLACEHOLDER =
        "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert("Title and description are required!");
            return;
        }

        const newCard = { title, description,  gif: GIF_PLACEHOLDER, author: author || null };

        try {
            const res = await fetch(
                `http://localhost:3000/api/boards/${boardId}/cards`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Create a New Card</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
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
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </label>

                    <button type="submit">Create Card</button>
                </form>
            </div>
        </div>
    );
};

export default AddCardModal;
