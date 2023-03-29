import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeState {
    q_index: number,
    targetTime: number,
    secondsLeft: number
}

export const defaultTimeState: TimeState = {
    q_index: 0,
    targetTime: 0,
    secondsLeft: 60
}

const timeStateSlice = createSlice({
    name: "timeSlice",
    initialState: defaultTimeState,
    reducers: {
        updateIndex: (state: TimeState, action: PayloadAction<number>): void => {
            state.q_index = action.payload;
        },
        updateTargetTime: (state: TimeState, action: PayloadAction<number>): void => {
            state.targetTime = action.payload;
        },
        updateSecondsLeft: (state: TimeState, action: PayloadAction<number>): void => {
            state.secondsLeft = action.payload;
        }
    }
})

export const { updateIndex, updateTargetTime, updateSecondsLeft } = timeStateSlice.actions;

export const timeSliceReducer = timeStateSlice.reducer;