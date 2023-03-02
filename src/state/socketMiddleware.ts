import { Middleware } from "redux";
import io from "socket.io-client";
import { SOCKET_URL } from "../settings";

export default function socketMiddleware(): Middleware {
  const socket = io(SOCKET_URL);

  return ({ dispatch }) =>
    next =>
    action => {
      if (typeof action === "function") {
        return next(action);
      }

      const { socketEvent, leave, emit, emitPayload, handle } = action;

      console.log(action);
      console.log("SocketEvent!");
      if (!socketEvent) {
        return next(action);
      }

      if (leave) {
        socket.removeListener(socketEvent);
      }

      if (emit) {
        socket.emit(socketEvent, emitPayload);
      }

      //   let handleEvent = handle;
      //   if (typeof handleEvent === "string") {
      //     handleEvent = result => dispatch({ type: handle, result, ...rest });
      //   }
      return socket.on(socketEvent, handle);
    };
}
