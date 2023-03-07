import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  gameCode?: string;
  gameCreationCallTs?: number;
  hasJoinedGame?: boolean;
  gameStarted?: boolean;
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
    setGameStarted: (state: GameState, action: PayloadAction<boolean>): void => {
      state.gameStarted = action.payload;
    },
  },
});

export const { setGameCode, createGame, setHasJoinedGame, setGameStarted } = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;
