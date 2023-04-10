import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

// game state with game fields
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

// default game state
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

// game state with reducers
const gameStateSlice = createSlice({
  name: "gameSlice",
  initialState: defaultGameState,
  reducers: {
    // sets the game code when a new game is created
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
    // set joined game field 
    setHasJoinedGame: (state: GameState, action: PayloadAction<boolean>): void => {
      state.hasJoinedGame = action.payload;
    },
    // sets and updates gameStarted when a game is started by the host
    setGameStarted: (state: GameState, action: PayloadAction<boolean>): void => {
      state.gameStarted = action.payload;
    },
    // increments poll to get the game count
    incrementPollGetGameCount: (state: GameState, action: PayloadAction<number>): void => {
      state.pollGetGameCount = state.pollGetGameCount + action.payload;
    },
    // sets the game button pressed state
    setStartGameButtonPressed: (state: GameState, action: PayloadAction<boolean>): void => {
      state.startGameButtonPressed = action.payload;
    },
    // resets the flag that the host has got the question and does not need to poll for the next one
    setGotQuestion: (state: GameState, action: PayloadAction<boolean>): void => {
      state.gotQuestion = action.payload;
    },
    // increments the poll to get question count
    incrementPollGetQuestionCount: (state: GameState, action: PayloadAction<number>): void => {
      state.pollGetQuestionCount = state.pollGetQuestionCount + action.payload;
    },
    // sets the flag to reset the next question and poll for it
    setRequestNextQuestion: (state: GameState, action: PayloadAction<boolean>): void => {
      state.requestNextQuestion = action.payload;
    },
    // sets the game players
    setPlayers: (state: GameState, action: PayloadAction<Array<string>>): void => {
      state.players = action.payload;
    },
    // resets the game state 
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
