import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
    code: string;
}

export const defaultGameState: GameState = {
    code: "1234567890"
};

const gameStateSlice = createSlice({
    name: 'codeSlice',
    initialState: defaultGameState,
    reducers: {
        setCode: (state: GameState, action: PayloadAction<string>): void => {
            state.code = action.payload;
        }
    }
});

export const { setCode } = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;