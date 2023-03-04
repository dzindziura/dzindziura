import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./Kanban/KanbanSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    middleware: [thunk, logger],
  },
});
