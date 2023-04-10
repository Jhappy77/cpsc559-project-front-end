import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  gameCode?: string;
  gameCreationCallTs?: number;
  hasJoinedGame?: boolean;
  question?: string;
  gameStarted: boolean;
  pollGetGameCount: number;
  startGameButtonPressed: boolean;
  pollGetQuestionCount: number;
  gotQuestion: boolean;
  requestNextQuestion: boolean;
  players: Array<string>;
}

export const defaultGameState: GameState = {
  pollGetGameCount: 0,
  hasJoinedGame: false,
  gameStarted: false,
  startGameButtonPressed: false,
  pollGetQuestionCount: 0,
  gotQuestion: false,
  requestNextQuestion: false,
  players: []
};

const gameStateSlice = createSlice({
  name: "gameSlice",
  initialState: defaultGameState,
  reducers: {
    setGameCode: (state: GameState, action: PayloadAction<string | undefined>): void => {
      state.gameCode = action.payload;
    },
    createGame: (state: GameState, action: Action): void => {
      // Updating this timestamp tells useCreateGame to perform API call
      console.log("game creation call started");
      state.gameCreationCallTs = Date.now();
    },
    // dispatch createQuestion when you press start game button
    fetchQuestion: (state: GameState, action: PayloadAction<string>): void => {
      // Updating this timestamp tells useCreateGame to perform API call
      state.question = action.payload;
    },
    setHasJoinedGame: (state: GameState, action: PayloadAction<boolean>): void => {
      state.hasJoinedGame = action.payload;
    },
    setGameStarted: (state: GameState, action: PayloadAction<boolean>): void => {
      state.gameStarted = action.payload;
    },
    incrementPollGetGameCount: (state: GameState, action: PayloadAction<number>): void => {
      state.pollGetGameCount = state.pollGetGameCount + action.payload;
    },
    setStartGameButtonPressed: (state: GameState, action: PayloadAction<boolean>): void => {
      state.startGameButtonPressed = action.payload;
    },
    setGotQuestion: (state: GameState, action: PayloadAction<boolean>): void => {
      state.gotQuestion = action.payload;
    },
    incrementPollGetQuestionCount: (state: GameState, action: PayloadAction<number>): void => {
      state.pollGetQuestionCount = state.pollGetQuestionCount + action.payload;
    },
    setRequestNextQuestion: (state: GameState, action: PayloadAction<boolean>): void => {
      state.requestNextQuestion = action.payload;
    },
    setPlayers: (state: GameState, action: PayloadAction<Array<string>>): void => {
      state.players = action.payload;
    },
    resetGameState: (state: GameState, action: Action): void => {
      state.pollGetGameCount = 0;
      state.hasJoinedGame = false;
      state.gameStarted = false;
      state.startGameButtonPressed = false;
      state.pollGetQuestionCount = 0;
      state.gotQuestion = false;
      state.requestNextQuestion = false;
      state.players = [];
    }
  },
});

export const {
  setGameCode,
  createGame,
  setHasJoinedGame,
  fetchQuestion,
  setGameStarted,
  incrementPollGetGameCount,
  setStartGameButtonPressed,
  setGotQuestion,
  incrementPollGetQuestionCount,
  setRequestNextQuestion,
  setPlayers,
  resetGameState
} = gameStateSlice.actions;

export const gameSliceReducer = gameStateSlice.reducer;
