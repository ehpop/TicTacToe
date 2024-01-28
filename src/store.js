import { createStore } from "redux";
import { ticTacToeReducer } from "./reducer";
import { CONSTANTS } from "./App";

const initialState = {
  nextMove: CONSTANTS.INITIAL_MOVE,
  board: CONSTANTS.INITIAL_BOARD,
  remainingTime: CONSTANTS.INITIAL_TIME_PER_MOVE,
  winner: null
};
const ticTacToeStore = createStore(ticTacToeReducer, initialState);

export default ticTacToeStore;
