import BoardCard from "./BoardCard";
import image from "../assets/react.svg"

const BoardList = () => {

    return (
        <div className="board-list-component">
            <ul className="board-list">
                <li className="board-list-item">
                    <BoardCard
                        id={1}
                        title={"Hi"}
                        image={image}
                        type={"Celebration"}
                    />
                </li>
                <li className="board-list-item">
                    <BoardCard
                        id={2}
                        title={"Hi"}
                        image={image}
                        type={"Celebration"}
                    />
                </li>
            </ul>
        </div>
    );
};

export default BoardList;
