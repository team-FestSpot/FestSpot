import { createContext, useContext } from "react";

export const BoardContext = createContext({
  currentBoard: "free",
  onBoardChange: () => {},
  loading: false,
});

export const useBoard = () => useContext(BoardContext);
