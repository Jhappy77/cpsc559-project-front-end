import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// A slice is an independent part of the state that h

export interface LeaderboardState {
  leaders?: Array<string>;
  scores?: Array<number>
}

export const defaultPlayerState: LeaderboardState = {
    leaders:undefined,
    scores:undefined,
};

const leaderboardStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultPlayerState,
  reducers: {
    setLeaderboard: (state: LeaderboardState, action: PayloadAction<string | undefined>): void => {
      
    }
  },
});

export const { setLeaderboard } = leaderboardStateSlice.actions;

export const playerSliceReducer = leaderboardStateSlice.reducer;
