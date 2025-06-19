import Card from "./Card";

const CardList = ({ cards, onUpvote }) => {
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
                            onUpvote={() => onUpvote(card.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
