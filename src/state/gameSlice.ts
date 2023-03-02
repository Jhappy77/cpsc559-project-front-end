import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  code?: string;
  gameCreationCallTs?: number;
}

export const defaultGameState: GameState = {};

const gameStateSlice = createSlice({
  name: "codeSlice",
  initialState: defaultGameState,
  reducers: {
    setCode: (state: GameState, action: PayloadAction<string>): void => {
      state.code = action.payload;
    },
    createGame: (state: GameState, action: Action): void => {
      // Updating this timestamp tells useCreateGame to perform API call
      state.gameCreationCallTs = Date.now();
    },
  },
});

export const { setCode, createGame } = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;
