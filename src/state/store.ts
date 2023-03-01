import { configureStore } from "@reduxjs/toolkit";
import { defaultPlayerState, playerSliceReducer, PlayerState } from "./playerSlice";
import { defaultSocketState, socketSliceReducer, SocketState } from "./socketSlice";

// See what's inside here live in your browser! Search "Redux dev tools" in the extension store

// Divide the store into logical segments, where state in 1 segment does not directly rely on value
// of state in another segment
export interface StoreState {
  player: PlayerState;
  socket: SocketState;
  // questions: QuestionsState; // example
  // ui: UiState; // example 2
}

const defaultStoreState: StoreState = {
  player: defaultPlayerState,
  socket: defaultSocketState,
  // questions: defaultQuestions // example
};

const reducer = {
  player: playerSliceReducer,
  socket: socketSliceReducer,
  // questions: questionsSliceReducer // example
};

export const store = configureStore({ reducer, preloadedState: defaultStoreState });

// // From https://react-redux.js.org/using-react-redux/usage-with-typescript
// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
