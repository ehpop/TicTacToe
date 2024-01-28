import "./styles/Board.css";
import { useDispatch } from "react-redux";

function Board({ board }) {
  const dispatch = useDispatch();

  const onButtonClicked = (x, y) => {
    dispatch({
      type: "pressed",
      row: x,
      column: y
    });
  };

  const renderCell = (value, columnIndex, rowIndex) => (
    <div key={`${columnIndex} ${rowIndex}`} className="cell">
      {value === "" ? (
        <button
          className="fill-in-button"
          onClick={() => onButtonClicked(columnIndex, rowIndex)}
        ></button>
      ) : (
        value
      )}
    </div>
  );

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((cell, columnIndex) => renderCell(cell, columnIndex, rowIndex))}
    </div>
  );

  const renderBoard = () => (
    <div className="board">
      {board.map((row, rowIndex) => renderRow(row, rowIndex))}
    </div>
  );

  return <div>{renderBoard()}</div>;
}

export default Board;
