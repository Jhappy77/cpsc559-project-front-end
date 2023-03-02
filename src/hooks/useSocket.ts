import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setIsConnected } from "../state/socketSlice";
import { useSocketJoinGameRoom } from "./useSocketJoinGameRoom";

export function useSocket() {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8008");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch(setIsConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
      dispatch(setIsConnected(false));
    });

    socket.on("player-list", args => {
      console.log("Got player list");
    });

    return () => {
      console.log("Returning use effect");
      socket.off("connect");
      socket.off("disconnect");
      //   socket.disconnect();
      //   socket.close();
    };
  }, [dispatch]);

  useSocketJoinGameRoom(socket);
}

// const sendPing = () => {
//   socket.emit("ping");
// };
