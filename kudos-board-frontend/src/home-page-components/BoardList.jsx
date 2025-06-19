import BoardCard from "./BoardCard";

const BoardList = ({ boards, onDelete }) => {

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
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
