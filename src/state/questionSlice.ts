import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionState {
  submittedAnswerTrue?: boolean;
  answer?: number;
  correctAnswer?: number;
  prompt?: string;
  answers?: Array<string>;
  index?: number;
}

export const defaultQuestionState: QuestionState = {};

const questionStateSlice = createSlice({
  name: "codeSlice",
  initialState: defaultQuestionState,
  reducers: {
    submitQuestion: (state: QuestionState, action: Action): void => {
      // Updating this timestamp tells useSubmitAnswer if
      console.log(`in submitQuestion slice, ${state.answer}`);
      if (state.answer === undefined) {
        return;
      }
      state.submittedAnswerTrue = false;
      if(state.answer === state.correctAnswer) {
        state.submittedAnswerTrue = true;
      }
    },
    setQuestion: (state: QuestionState, action: PayloadAction<any>): void => {
      state.prompt = action.payload.prompt;
      state.correctAnswer = action.payload.correctAnswerIndex;
      state.answers = action.payload.answers;
      state.index = action.payload.index + 1;
    },
    setQuestionAnswer:(state: QuestionState, action: PayloadAction<number | undefined>): void => {
      state.answer = action.payload;
    }
  },
})

export const { submitQuestion, setQuestion, setQuestionAnswer } = questionStateSlice.actions;

export const questionSliceReducer = questionStateSlice.reducer;
