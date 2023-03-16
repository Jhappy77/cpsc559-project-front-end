import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// A slice is an independent part of the state that h

export interface PlayerState {
  name?: string;
  isHost: boolean;
  // score: number; // example
}

export const defaultPlayerState: PlayerState = {
  name: `The Champion (a.k.a. Joel)`,
  isHost: false,
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
    // Example:
    // setScore: (state: PlayerState, action: PayloadAction<string>): void => {
    //     state.name = action.payload;
    //   },
    // Don't forget to export new actions below
  },
});

export const { setPlayerName, setIsHost /*setPlayerScore*/ } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
