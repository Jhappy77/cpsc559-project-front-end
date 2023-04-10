import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// player state and fields
export interface PlayerState {
  name?: string;
  isHost: boolean;
  rejoinAsHost: boolean;
  rejoinAsPlayer: boolean;
  score: number;
}

// default player state if not already defined
export const defaultPlayerState: PlayerState = {
  name: "",
  isHost: false,
  rejoinAsHost: false,
  rejoinAsPlayer: false,
  score: 0,
};

// player slices and reducers
const playerStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultPlayerState,
  reducers: {
    // sets a player name when they join the game
    setPlayerName: (state: PlayerState, action: PayloadAction<string | undefined>): void => {
      if (state.name !== action.payload) {
        state.name = action.payload;
      }
    },
    // sets the isHost state for a player or host depending on their status
    setIsHost: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.isHost = action.payload;
    },
    // set rejoin as host true if the host is trying to rejoin
    setRejoinAsHost: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.rejoinAsHost = action.payload;
    },
    // set rejoin as player true if a player is trying to rejoin
    setRejoinAsPlayer: (state: PlayerState, action: PayloadAction<boolean>): void => {
      state.rejoinAsPlayer = action.payload;
    },
    // sets the player score after they have submitted an answer
    setPlayerScore: (state: PlayerState, action: PayloadAction<number>): void => {
      state.score += action.payload;
    },
    // resets the player state
    resetPlayerState: (state: PlayerState, action: PayloadAction): void => {
      state.name = "";
      state.isHost = false;
      state.rejoinAsHost = false;
      state.score = 0;
    }
  },
});

export const { setPlayerName, setIsHost, setRejoinAsHost, setPlayerScore, resetPlayerState, setRejoinAsPlayer } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
