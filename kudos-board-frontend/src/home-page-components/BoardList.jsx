import BoardCard from "./BoardCard";

const BoardList = ({ boards }) => {

  return (
    <div className="board-list-component">
      <ul className="board-list">
        {boards.map((board) => (
          <li key={board.id} className="board-list-item">
            <BoardCard
              id={board.id}
              title={board.title}
              image={`https://picsum.photos/200/300?random=${board.id}`}
              category={board.category}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
