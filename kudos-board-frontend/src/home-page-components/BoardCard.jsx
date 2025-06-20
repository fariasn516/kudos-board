import { Link } from 'react-router-dom';

function BoardCard({ id, title, category, image, onDelete }) {
  return (
    <article className="board-card">
      <img src={image} alt={`${title} Board`} />
      <h2 className="board-card-title">{title}</h2>
      <p className="board-card-category">{category}</p>

      <div className="board-card-buttons">
        <Link
          to={`/board/${id}`}
          state={{ id, title, category, image }}
          className="board-view-button"
        >
          View
        </Link>
        <button
          className="board-delete-button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default BoardCard;
