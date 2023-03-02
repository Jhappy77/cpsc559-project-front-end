import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SocketState {
  isConnected: boolean;
}

export const defaultSocketState: SocketState = {
  isConnected: false,
};

const socketStateSlice = createSlice({
  name: `socketSlice`,
  initialState: defaultSocketState,
  reducers: {
    setIsConnected: (state: SocketState, action: PayloadAction<boolean>): void => {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = socketStateSlice.actions;

export const socketSliceReducer = socketStateSlice.reducer;

// Action creator with received function:
// export function subscribeConversation() {
//     return dispatch => dispatch({
//       event: 'message',
//       handle: data => dispatch({
//         type: NEW_MESSAGE,
//         payload: data.message,
//       }),
//     });
//   }
