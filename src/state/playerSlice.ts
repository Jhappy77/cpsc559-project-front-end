import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// A slice is an independent part of the state that h

export interface PlayerState {
  name?: string;
  isHost: boolean;
  score: number;
  score: number;
}

export const defaultPlayerState: PlayerState = {
  name: `The Champion (a.k.a. Joel)`,
  isHost: false,
  score: 0,
  score: 0,
};

const playerStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultPlayerState,
  reducers: {
    setPlayerName: (state: PlayerState, action: PayloadAction<string | undefined>): void => {
      if (state.name !== action.payload) {
        state.name = action.payload;
      }
    },
    setIsHost: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.isHost = action.payload;
    },
    setScore: (state: PlayerState): void => {
        state.score = state.score + 1;
      },
  },
});

export const { setPlayerName, setIsHost, setScore } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
