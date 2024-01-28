import { useEffect } from "react";
import Board from "./Board";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";

export const CONSTANTS = {
  INITIAL_MOVE: "x",
  INITIAL_BOARD: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  INITIAL_TIME_PER_MOVE: 5
};

function App() {
  let nextMove = useSelector((state) => {
    return state?.nextMove;
  });
  let remainingTime = useSelector((state) => {
    return state?.remainingTime;
  });
  let board = useSelector((state) => {
    return state?.board;
  });
  let winner = useSelector((state) => {
    return state?.winner;
  });

  let dispatch = useDispatch();

  let onClick = () => {
    dispatch({
      type: "clear"
    });
  };

  useEffect(() => {
    if (remainingTime <= 0 || winner !== null) {
      return;
    }
    const t = setTimeout(() => {
      dispatch({
        type: "timer"
      });
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  });

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <h2>
        Next move: {nextMove} {`${remainingTime}s remaining`}
      </h2>
      <div className="buttons">
        <button onClick={onClick}>Clear board</button>
      </div>
      <div className="board-div">
        <Board board={board}></Board>
      </div>
      {winner && (
        <div className="blur">
          <div className="winner-pop-up">
            <p className="winner-message">Winner is: {winner}</p>
            <button onClick={onClick}>Play again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
