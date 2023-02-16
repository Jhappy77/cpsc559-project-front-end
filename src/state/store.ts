import { configureStore } from '@reduxjs/toolkit';
import { defaultPlayerState, playerSliceReducer, PlayerState } from './playerSlice';

export interface StoreState {
  player: PlayerState;
}

const defaultStoreState: StoreState = {
  player: defaultPlayerState,
};

const reducer = {
  player: playerSliceReducer,
};

export const store = configureStore({reducer, preloadedState: defaultStoreState});

// // From https://react-redux.js.org/using-react-redux/usage-with-typescript
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// https://stackoverflow.com/a/64226376/14404567
