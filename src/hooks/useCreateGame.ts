import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setGameCode, createGame } from "../state/gameSlice";
import { joinGameRoomAsHostAction } from "../state/socketActions/joinGameRoomAction";
import Cookies from "js-cookie";

export function useCreateGame() {
  const { gameCreationCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameCreationCallTs) return;
    const generatedGameCode = uuidv4().substring(0, 5);
    axios
      .post(`${API_URL}/games/${generatedGameCode}`)
      .then(response => {
        const gameCode = response.data.joinCode;
        if (gameCode) {
          dispatch(setGameCode(gameCode));
          dispatch(joinGameRoomAsHostAction(gameCode));
          console.log("Joined game!");
        } else throw new Error("No game code recieved");
      })
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 466) {
          console.log("466 error");
          dispatch(createGame());
        }
        else {
          console.error("Unhandled error in useCreateGame");
          console.error(reason);
        }
      });
  }, [gameCreationCallTs]);
}
