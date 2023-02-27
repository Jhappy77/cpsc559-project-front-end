import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CodeState {
    code: string;
}

export const defaultCodeState: CodeState = {
    code: "1234567890"
};

const codeStateSlice = createSlice({
    name: 'codeSlice',
    initialState: defaultCodeState,
    reducers: {
        setCode: (state: CodeState, action: PayloadAction<string>): void => {
            state.code = action.payload;
        }
    }
});

export const { setCode } = codeStateSlice.actions;

export const codeSliceReducer = codeStateSlice.reducer;