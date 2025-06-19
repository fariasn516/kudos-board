import { Link } from 'react-router-dom';

function BoardCard(props) {

  return (
    <>
      <article className="board-card">
        <img src={props.image} alt={`${props.title} Board`} />
        <h2 className="board-card-title">{props.title}</h2>
        <p className="board-card-category">{props.category}</p>
        <div className="board-card-buttons">
          <Link to={`/board/${props.id}`}
            state={{
              id: props.id,
              title: props.title,
              category: props.category,
              image: props.image
            }}
            className="board-view-button">View</Link>
          <button
            className="board-delete-button"
            onClick={() => props.onDelete(props.id)}
          >
            Delete
          </button>
        </div>
      </article>
    </>
  );
}

export default BoardCard;
