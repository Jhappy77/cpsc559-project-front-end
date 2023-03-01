import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setIsConnected } from "../state/socketSlice";

const socket = io("http://localhost:8008");
export function useSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch(setIsConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setIsConnected(false));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch]);
}

// const sendPing = () => {
//   socket.emit("ping");
// };
