import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
  code?: string;
  submittedAnswerTrue?: boolean;
  answer?: number;
  correctAnswer?: number;
}

export const defaultQuestionState: QuestionState = {};

const questionStateSlice = createSlice({
  name: "codeSlice",
  initialState: defaultQuestionState,
  reducers: {
    setCode: (state: QuestionState, action: PayloadAction<string>): void => {
      state.code = action.payload;
    },
    submitQuestion: (state: QuestionState, action: Action): void => {
      // Updating this timestamp tells useSubmitAnswer if
      if(state.answer === undefined) {
        return;
      }
      state.submittedAnswerTrue = false;
      if(state.answer === state.correctAnswer) {
        state.submittedAnswerTrue = true;
      }
    },
  },
})

export const { setCode, submitQuestion } = questionStateSlice.actions;

export const questionSliceReducer = questionStateSlice.reducer;
