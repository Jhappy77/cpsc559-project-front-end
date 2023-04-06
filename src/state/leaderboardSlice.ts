import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface LeaderboardState {
  leaders: string[]
  scores: string[]
  requestUpdatedLeaderboard: boolean
}

export const defaultLeaderboardState: LeaderboardState = {
    leaders: [],
    scores: [],
    requestUpdatedLeaderboard: true,
};

const leaderboardStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultLeaderboardState,
  reducers: {
    setLeaderboard: (state: LeaderboardState, action: PayloadAction<any>): void => {
      console.log("leaderboard: ", action.payload.leaderboard);
      action.payload.leaderboard.forEach((element : any) => {
        const [ player, score ] = element.split(":");
        console.log("Player and score: ", player, score);
        state.leaders.push(player);
        state.scores.push(score);
      });
      state.requestUpdatedLeaderboard = false;
      state.leaders.reverse();
      state.scores.reverse();
      console.log("leaders: ", state.leaders);
      console.log("scores: ", state.scores);
    },
    setRequestUpdatedLeaderboard: (state: LeaderboardState, action: PayloadAction<boolean>): void => {
      state.requestUpdatedLeaderboard = action.payload;
    },
    resetLeaderboard: (state: LeaderboardState): void => {
      state.leaders = [];
      state.scores = [];
      state.requestUpdatedLeaderboard = false;
    }
  },
});

export const { setLeaderboard, setRequestUpdatedLeaderboard, resetLeaderboard } = leaderboardStateSlice.actions;

export const leaderboardSliceReducer = leaderboardStateSlice.reducer;