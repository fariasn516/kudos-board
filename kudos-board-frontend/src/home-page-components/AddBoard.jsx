import React from 'react';

const AddBoard = ({ onClick }) => {
    return (
      <section className="add-board">
        <button onClick={onClick} className="add-board-button">
          Add Board
        </button>
      </section>
    );
  };

export default AddBoard;
