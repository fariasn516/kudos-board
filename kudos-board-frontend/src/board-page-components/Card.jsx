function Card(props) {

  return (
    <>
      <article className="card">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-description">{props.description}</p>
        <img className="card-image" src={props.gif} alt={`${props.title} Card`} />
        <div className="card-buttons">
          <button onClick={props.onUpvote}>Upvote ({props.upvotes})</button>
          <button className="card-delete-button">Delete</button>
        </div>
      </article>
    </>
  );
}

export default Card;
