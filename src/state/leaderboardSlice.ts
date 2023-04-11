import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// leaderboard state fields
export interface LeaderboardState {
  leaders: string[]
  scores: string[]
  requestUpdatedLeaderboard: boolean
}

// default leaderboard state if not defined
export const defaultLeaderboardState: LeaderboardState = {
    leaders: [],
    scores: [],
    requestUpdatedLeaderboard: true,
};

// leaderboard state with reduceres
const leaderboardStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultLeaderboardState,
  reducers: {
    // sets the leaderboard with the updated top scores of game players
    setLeaderboard: (state: LeaderboardState, action: PayloadAction<any>): void => {
      console.log("leaderboard: ", action.payload.leaderboard);
      action.payload.leaderboard.forEach((element : any) => {
        const [ player, score ] = element.split(":");
        console.log("Player and score: ", player, score);
        state.leaders.push(player);
        state.scores.push(score);
      });
      state.requestUpdatedLeaderboard = false;
      console.log("leaders: ", state.leaders);
      console.log("scores: ", state.scores);
    },
    // update requestUpdateLeaderboard to determine if it needs to be polled
    setRequestUpdatedLeaderboard: (state: LeaderboardState, action: PayloadAction<boolean>): void => {
      state.requestUpdatedLeaderboard = action.payload;
    },
    // resets the leaderboard
    resetLeaderboard: (state: LeaderboardState): void => {
      state.leaders = [];
      state.scores = [];
      state.requestUpdatedLeaderboard = false;
    }
  },
});

export const { setLeaderboard, setRequestUpdatedLeaderboard, resetLeaderboard } = leaderboardStateSlice.actions;

export const leaderboardSliceReducer = leaderboardStateSlice.reducer;