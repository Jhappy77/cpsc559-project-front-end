import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { AxiosError } from "axios";
import baxios from '../baxios';
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setGameCode, createGame } from "../state/gameSlice";
import { joinGameRoomAsHostAction } from "../state/socketActions/joinGameRoomAction";

export function useCreateGame() {
  const { gameCreationCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameCreationCallTs) return;
    const generatedGameCode = uuidv4().substring(0, 5);
    baxios
      .post(`${getProxyUrl()}/games/${generatedGameCode}`)
      .then(response => {
        const gameCode = response.data.joinCode;
        if (gameCode) {
          dispatch(setGameCode(gameCode));
          dispatch(joinGameRoomAsHostAction(gameCode));
          console.log("Joined game!");
        } else throw new Error("No game code recieved");
      })
      .catch((reason: AxiosError) => {
        console.error("error in useCreateGame");
        console.error(reason);
        // Keep trying to create a game until successful
        dispatch(createGame());
      });
  }, [gameCreationCallTs]);
}
