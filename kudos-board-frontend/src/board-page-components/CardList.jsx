import Card from "./Card";

const CardList = ({ cards, onUpvote, onDelete, onPinToggle, onCommentClick }) => {
    return (
        <div className="card-list-component">
            <ul className="card-list">
                {cards.map((card) => (
                    <li key={card.id} className="card-list-item">
                        <Card
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            gif={card.gif}
                            upvotes={card.upvotes}
                            author={card.author}
                            comments={card.comments}
                            onUpvote={() => onUpvote(card.id)}
                            onDelete={() => onDelete(card.id)}
                            pinned={card.pinned}
                            onPinToggle={() => onPinToggle(card.id, card.pinned)}
                            onCommentClick={onCommentClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
