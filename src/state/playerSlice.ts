import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// A slice is an independent part of the state that h

export interface PlayerState {
  name: string;
  // score: number; // example
}

export const defaultPlayerState: PlayerState = {
  name: `The Champion (a.k.a. Joel)`,
};

const playerStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultPlayerState,
  reducers: {
    setPlayerName: (state: PlayerState, action: PayloadAction<string>): void => {
      state.name = action.payload;
      console.log(`setting playername: ${state.name}`);
    },
    // Example:
    // setScore: (state: PlayerState, action: PayloadAction<string>): void => {
    //     state.name = action.payload;
    //   },
    // Don't forget to export new actions below
  },
});

export const { setPlayerName /*setPlayerScore*/ } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
