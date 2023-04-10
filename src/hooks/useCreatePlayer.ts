import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice";

export function useCreatePlayer() {
  const { name } = useAppSelector(state => state.player);
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!name || !gameCode || name === "" || gameCode === "") return;
    baxios
      .post(`${getProxyUrl()}/players`, {
        name: name,
        joinCode: gameCode,
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(setHasJoinedGame(true));
        } else if (response.status === 203) {
          dispatch(setHasJoinedGame(false));
          alert("This game has already begun, please try again with a different game.");
        } else {
          dispatch(setHasJoinedGame(false));
        }
        console.log(`API Call to: /players, response: ${response.status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in useCreatePlayer");
        console.error(reason);
        alert("A user with this name already exists, please try again with a new name!");
      });
  }, [name]);
}
