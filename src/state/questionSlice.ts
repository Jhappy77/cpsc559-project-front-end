import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface QuestionState {
  questionScore?: number;
  answer?: number;
  correctAnswer?: number;
  prompt?: string;
  answers?: Array<string>;
  index?: number;
}

export const defaultQuestionState: QuestionState = {
  questionScore: undefined
};

const questionStateSlice = createSlice({
  name: "codeSlice",
  initialState: defaultQuestionState,
  reducers: {
    submitQuestion: (state: QuestionState, action: PayloadAction<number>): void => {
      // Updating this timestamp tells useSubmitAnswer if
      console.log(`in submitQuestion slice, ${state.answer}`);
      if (state.answer === undefined) {
        return;
      }
      state.questionScore = 0;
      if(state.answer === state.correctAnswer) {
        state.questionScore = action.payload;
      }
    },
    submitQuestionExpired: (state: QuestionState, action: Action): void => {
      // submit to backend that user could not answer question in allotted time
      state.questionScore = 0;
    },
    setQuestion: (state: QuestionState, action: PayloadAction<any>): void => {
      state.prompt = action.payload.prompt;
      state.correctAnswer = action.payload.correctAnswerIndex;
      state.answers = action.payload.answers;
      state.index = action.payload.index + 1;
    },
    setQuestionAnswer:(state: QuestionState, action: PayloadAction<number | undefined>): void => {
      state.answer = action.payload;
    },
    incrementQuestionIndex:(state: QuestionState, action: PayloadAction<number>): void => {
      if (state.index !== undefined) {
        state.index = state.index + action.payload;
      }
    },
    resetQuestionScore: (state: QuestionState, action: Action): void => {
      state.questionScore = undefined;
    }
  },
})

export const { submitQuestion, setQuestion, setQuestionAnswer, incrementQuestionIndex, resetQuestionScore, submitQuestionExpired } = questionStateSlice.actions;

export const questionSliceReducer = questionStateSlice.reducer;
