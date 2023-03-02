import { Socket } from "socket.io-client";
import { useEffect } from "react";
import { useAppSelector } from "../state/reduxHooks";

export function useSocketJoinGameRoom(socket: Socket) {
  const { isConnected } = useAppSelector(state => state.socket);
  const { code } = useAppSelector(state => state.game);
  useEffect(() => {
    if (code && isConnected) {
      console.log("Joining room!");
      socket.emit("join-game-room", code);
    }
  }, [socket, isConnected, code]);
}
