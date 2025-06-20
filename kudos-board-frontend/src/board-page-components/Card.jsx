function Card(props) {
  const {
    id,
    title,
    description,
    gif,
    upvotes,
    pinned,
    onUpvote,
    onDelete,
    onPinToggle,
    onCommentClick, 
    comments,
    author
  } = props;

  return (
    <article className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <img className="card-image" src={gif} alt={`${title} Card`} />
      {author && <p className="card-author">By: {author}</p>}
      <div className="card-buttons">
        <button
          className={`pin-button ${pinned ? "active" : ""}`}
          onClick={onPinToggle}
          title={pinned ? "Unpin" : "Pin to top"}
        >
          📌
        </button>
        <button className="card-upvote-button" onClick={onUpvote}>
          Upvote ({upvotes})
        </button>
        <button className="card-delete-button" onClick={onDelete}>
          Delete
        </button>
        <button onClick={() => onCommentClick(props)}>View Comments</button>
      </div>
    </article>
  );
}

export default Card;
