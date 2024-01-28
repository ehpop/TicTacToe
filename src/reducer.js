import { CONSTANTS } from "./App";

function findWinner(board) {
  for (let row = 0; row < 3; row++) {
    if (
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2] &&
      board[row][0] !== ""
    ) {
      return board[row][0];
    }
  }

  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col] &&
      board[0][col] !== ""
    ) {
      return board[0][col];
    }
  }

  if (
    (board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== "") ||
    (board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== "")
  ) {
    return board[1][1];
  }

  arrayFull = isArrayFull(board);

  return arrayFull ? "draw" : null;
}

function isArrayFull(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }

  return true;
}

export function ticTacToeReducer(state, action) {
  if (action?.type === "pressed") {
    let value = state?.nextMove === "x" ? "x" : "o";
    let newBoard = structuredClone(state.board);

    let columnIndex = Number.parseInt(action.column);
    let rowIndex = Number.parseInt(action.row);
    newBoard[columnIndex][rowIndex] = value;

    let newNextMove = state?.nextMove === "x" ? "o" : "x";
    return {
      ...state,
      nextMove: newNextMove,
      board: newBoard,
      winner: findWinner(newBoard),
      remainingTime: CONSTANTS.INITIAL_TIME_PER_MOVE
    };
  }

  if (action?.type === "clear") {
    return {
      ...state,
      nextMove: CONSTANTS.INITIAL_MOVE,
      board: CONSTANTS.INITIAL_BOARD,
      winner: null,
      remainingTime: CONSTANTS.INITIAL_TIME_PER_MOVE
    };
  }

  if (action?.type === "timer") {
    let newRemainingTime = state.remainingTime - 1;

    let winner = null;
    if (newRemainingTime <= 0) {
      winner = state?.nextMove === "x" ? "o" : "x";
    }

    return {
      ...state,
      remainingTime: newRemainingTime,
      winner: winner
    };
  }

  return state;
}
