import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  name: string;
}

export const defaultPlayerState: PlayerState = {
  name: `The Champion (a.k.a. Joel)`
};

const playerStateSlice = createSlice({
  name: `playerSlice`,
  initialState: defaultPlayerState,
  reducers: {
    setPlayerName: (state: PlayerState, action: PayloadAction<string>): void => {
      state.name = action.payload;
    },
  },
});

export const { setPlayerName } = playerStateSlice.actions;

export const playerSliceReducer = playerStateSlice.reducer;
