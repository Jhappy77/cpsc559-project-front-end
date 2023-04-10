import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

// tracks the time state for the current question
export interface TimeState {
  q_index: number;
  targetTime: number;
  secondsLeft: number;
}

export const defaultTimeState: TimeState = {
  q_index: 0,
  targetTime: 0,
  secondsLeft: 10,
};

// creates the time slice and reducers for the timer
const timeStateSlice = createSlice({
  name: "timeSlice",
  initialState: defaultTimeState,
  reducers: {
    // updates the timer's question index
    updateIndex: (state: TimeState, action: PayloadAction<number>): void => {
      state.q_index = action.payload;
    },
    // sets the target time for the timer
    updateTargetTime: (state: TimeState, action: PayloadAction<number>): void => {
      state.targetTime = action.payload;
    },
    // updates seconds left in the timer every second
    updateSecondsLeft: (state: TimeState, action: PayloadAction<number>): void => {
      state.secondsLeft = action.payload;
    },
    // resets the time after a new question is fetched
    resetTimeState: (state: TimeState, action: Action): void => {
      state.q_index = 0;
      state.targetTime = 0;
      state.secondsLeft = 20;
    }
  },
});

export const { updateIndex, updateTargetTime, updateSecondsLeft, resetTimeState } = timeStateSlice.actions;

export const timeSliceReducer = timeStateSlice.reducer;
