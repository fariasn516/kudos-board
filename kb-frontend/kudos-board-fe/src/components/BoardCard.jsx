import { useNavigate } from 'react-router-dom';

function BoardCard(props) {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate(`/board/${props.id}`);
    };

    return (
      <>
        <article className="board-card">
          <img src={props.image} alt={`${props.title} Board`} />
          <h2>{props.title}</h2>
          <p className="board-card-type">{props.type}</p>
          <div className="board-card-buttons">
            <button className="board-view-button" onClick={handleViewClick}>View</button>
            <button className="board-delete-button">Delete</button>
          </div>
        </article>
      </>
    );
  }

  export default BoardCard;
