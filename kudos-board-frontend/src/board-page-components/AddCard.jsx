import React from 'react';

const AddCard = ({ onClick }) => (
    <div className="add-card-button-container">
        <button className="add-card-button" onClick={onClick}>
            Add a New Card
        </button>
    </div>
);

export default AddCard;
