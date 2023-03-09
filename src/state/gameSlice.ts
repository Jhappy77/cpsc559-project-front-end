import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  gameCode?: string;
  gameCreationCallTs?: number;
  hasJoinedGame?: boolean;
  question?: string;
}

export const defaultGameState: GameState = {};

const gameStateSlice = createSlice({
  name: "gameSlice",
  initialState: defaultGameState,
  reducers: {
    setGameCode: (state: GameState, action: PayloadAction<string>): void => {
      state.gameCode = action.payload;
    },
    createGame: (state: GameState, action: Action): void => {
      // Updating this timestamp tells useCreateGame to perform API call
      state.gameCreationCallTs = Date.now();
    },
    // dispatch createQuestion when you press start game button
    fetchQuestion: (state: GameState, action: PayloadAction<string>): void => {
      // Updating this timestamp tells useCreateGame to perform API call
      state.question = action.payload;
    },
    setHasJoinedGame: (state: GameState, action: PayloadAction<boolean>): void => {
      state.hasJoinedGame = action.payload;
    },
  },
});

export const { setGameCode, createGame, fetchQuestion, setHasJoinedGame } = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;
