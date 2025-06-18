import Card from "./Card";
import image from "../assets/react.svg"

const CardList = () => {

    return (
        <div className="card-list-component">
            <ul className="card-list">
                <li className="card-list-item">
                    <Card
                        id={1}
                        title={"Hi"}
                        description={"Hello"}
                        gif={image}
                    />
                </li>
                <li className="card-list-item">
                    <Card
                        id={2}
                        title={"Hi"}
                        description={"Hello"}
                        gif={image}
                    />
                </li>
            </ul>
        </div>
    );
};

export default CardList;
