import { configureStore } from "@reduxjs/toolkit";
import { defaultGameState, gameSliceReducer, GameState } from "./gameSlice";
import { defaultPlayerState, playerSliceReducer, PlayerState } from "./playerSlice";
import { defaultQuestionState, questionSliceReducer, QuestionState } from "./questionSlice";
import { defaultTimeState, timeSliceReducer, TimeState } from "./timeSlice";
import socketMiddleware from "./socketMiddleware";

// See what's inside here live in your browser! Search "Redux dev tools" in the extension store

// Divide the store into logical segments, where state in 1 segment does not directly rely on value
// of state in another segment
export interface StoreState {
  player: PlayerState;
  game: GameState;
  question: QuestionState;
  time: TimeState;
  // ui: UiState; // example 2
}

const defaultStoreState: StoreState = {
  player: defaultPlayerState,
  game: defaultGameState,
  question: defaultQuestionState, // example
  time: defaultTimeState
};

const reducer = {
  player: playerSliceReducer,
  game: gameSliceReducer,
  question: questionSliceReducer, // example
  time: timeSliceReducer
};

export const store = configureStore({ reducer, preloadedState: defaultStoreState, middleware: [socketMiddleware()] });

// // From https://react-redux.js.org/using-react-redux/usage-with-typescript
// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
