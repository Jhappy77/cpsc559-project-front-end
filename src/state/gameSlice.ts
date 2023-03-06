import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  gameCode?: string;
  gameCreationCallTs?: number;
  hasJoinedGame?: boolean;
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
    setHasJoinedGame: (state: GameState, action: PayloadAction<boolean>): void => {
      state.hasJoinedGame = action.payload;
    },
  },
});

export const { setGameCode, createGame, setHasJoinedGame } = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;
