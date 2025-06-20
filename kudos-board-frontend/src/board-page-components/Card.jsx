function Card(props) {

  return (
    <>
      <article className="card">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-description">{props.description}</p>
        <img className="card-image" src={props.gif} alt={`${props.title} Card`} />
        <div className="card-buttons">
          <button className={`pin-button ${props.pinned ? "active" : ""}`} onClick={props.onPinToggle} title={props.pinned ? "Unpin" : "Pin to top"}>
            📌
          </button>
          <button className="card-upvote-button" onClick={props.onUpvote}>Upvote ({props.upvotes})</button>
          <button className="card-delete-button" onClick={props.onDelete}> Delete </button>
        </div>
      </article>
    </>
  );
}

export default Card;
