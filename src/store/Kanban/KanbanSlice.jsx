import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  allCards: [],
  allBoards: [],
  loading: "pending",
};
const groupCards = (boards, cards) => {
  const result = {};
  boards.forEach((board) => {
    result[board.uuid] = { name: board.Title, items: [] };
    cards.forEach((card) => {
      if (card.board_id === board.uuid) {
        result[board.uuid].items.push(card);
      }
    });
  });

  return result;
};
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    allCardsLoading: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    allCardsRecieved: (state, { payload }) => {
      state.loading = "idle";
      state.allCards = payload.cards.results;
      state.allBoards = payload.boards.results;
      const result = groupCards(payload.boards.results, payload.cards.results);

      state.data = result;
    },
    deleteCards: (state, { payload }) => {
      state.allCards = current(state.allCards).filter(
        (item) => item.id !== payload
      );
      const result = groupCards(state.allBoards, state.allCards);
      state.data = result;
    },
    deleteBoards: (state, { payload }) => {
      state.allBoards = current(state.allBoards).filter(
        (item) => item.uuid !== payload
      );
      const result = groupCards(state.allBoards, state.allCards);

      state.data = result;
    },
    addNewCard: (state, { payload }) => {
      state.allCards.push(payload);
      const result = groupCards(state.allBoards, state.allCards);
      state.data = result;
    },
    addNewBoards: (state, { payload }) => {
      state.allBoards.push(payload);
      const result = groupCards(state.allBoards, state.allCards);
      state.data = result;
    },
    sort: (state, {payload}) => {
      switch (payload.value) {
        case 'date':
          state.data[payload.id].items.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          break;
        case 'asc':
          state.data[payload.id].items.sort((a, b) => {
            return a.Task.localeCompare(b.Task);
          });
          break
        case 'desc':
          state.data[payload.id].items.sort((a, b) => {
            return b.Task.localeCompare(a.Task);
          });
          break
        default:
          break;
      }
    },
    dragEnd: (state, {payload}) => {
      state.data = payload;
    }
  },
  extraReducers: (builder) => {},
});

export const {
  allCardsLoading,
  allCardsRecieved,
  deleteCards,
  deleteBoards,
  addNewCard,
  addNewBoards,
  sort,
  dragEnd
} = cardsSlice.actions;

export const getAllData = (state) => state.cards.data;
export const getLoading = (state) => state.cards.loading;
export const getAllCards = (state) => state.cards.allCards;

export default cardsSlice.reducer;
