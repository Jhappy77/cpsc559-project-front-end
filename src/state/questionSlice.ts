import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

// question state with question fields
export interface QuestionState {
  questionScore?: number;
  answer?: number;
  correctAnswer?: number;
  prompt?: string;
  answers?: Array<string>;
  index?: number;
}

// default question state
export const defaultQuestionState: QuestionState = {
  questionScore: undefined,
};

// creates a question state slice with the question reducers
const questionStateSlice = createSlice({
  name: "codeSlice",
  initialState: defaultQuestionState,
  reducers: {
    // submits a question answer to the backend when a player submits it
    submitQuestion: (state: QuestionState, action: PayloadAction<number>): void => {
      // Updating this timestamp tells useSubmitAnswer if
      console.log(`in submitQuestion slice, ${state.answer}`);
      if (state.answer === undefined) {
        return;
      }
      state.questionScore = 0;
      if (state.answer === state.correctAnswer) {
        state.questionScore = action.payload;
      }
    },
    submitQuestionExpired: (state: QuestionState, action: Action): void => {
      // submit to backend that user could not answer question in allotted time
      state.questionScore = 0;
    },
    // sets the current game question
    setQuestion: (state: QuestionState, action: PayloadAction<any>): void => {
      state.prompt = action.payload.prompt;
      state.correctAnswer = action.payload.correctAnswerIndex;
      state.answers = action.payload.answers;
      state.index = action.payload.index + 1;
    },
    // sets the question answer
    setQuestionAnswer: (state: QuestionState, action: PayloadAction<number | undefined>): void => {
      state.answer = action.payload;
    },
    // increments the question index for the game to move to the next question
    incrementQuestionIndex: (state: QuestionState, action: PayloadAction<number>): void => {
      if (state.index !== undefined) {
        state.index = state.index + action.payload;
      }
    },
    // resets the question score after the game is over
    resetQuestionScore: (state: QuestionState, action: Action): void => {
      state.questionScore = undefined;
    },
    // resets the quesiton state when the game has finished
    resetQuestionState: (state: QuestionState, action: Action): void => {
      state.questionScore = undefined;
      state.answer = undefined;
      state.correctAnswer = undefined;
      state.prompt = undefined;
      state.answers = undefined;
      state.index =undefined;
    },
  },
});

export const {
  submitQuestion,
  setQuestion,
  setQuestionAnswer,
  incrementQuestionIndex,
  resetQuestionScore,
  submitQuestionExpired,
  resetQuestionState,
} = questionStateSlice.actions;

export const questionSliceReducer = questionStateSlice.reducer;
