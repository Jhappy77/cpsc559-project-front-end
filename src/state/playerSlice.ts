import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// A slice is an independent part of the state that h

export interface PlayerState {
  name?: string;
  isHost: boolean;
  rejoinAsHost: boolean;
  rejoinAsPlayer: boolean;
  score: number;
}

export const defaultPlayerState: PlayerState = {
  name: "",
  isHost: false,
  rejoinAsHost: false,
  rejoinAsPlayer: false,
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
    setRejoinAsHost: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.rejoinAsHost = action.payload;
    },
    setRejoinAsPlayer: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.rejoinAsPlayer = action.payload;
    },
    setPlayerScore: (state: PlayerState, action: PayloadAction<number>): void => {
      state.score += action.payload;
    },
  },
});

export const { setPlayerName, setIsHost, setRejoinAsHost, setPlayerScore, setRejoinAsPlayer } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
