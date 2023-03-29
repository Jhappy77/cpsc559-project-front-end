import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface LeaderboardState {
  leaders: string[]
  scores: number[]
}

export const defaultLeaderboardState: LeaderboardState = {
    leaders: [],
    scores: [],
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
        state.leaders?.push(player);
        state.scores?.push(Number(score));
      });
      console.log("leaders: ", state.leaders);
      console.log("scores: ", state.scores);
    }
  },
});

export const { setLeaderboard } = leaderboardStateSlice.actions;

export const leaderboardSliceReducer = leaderboardStateSlice.reducer;
