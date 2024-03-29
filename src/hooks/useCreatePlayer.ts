import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice";
import Cookies from "js-cookie";

// add a player to the database for the game that they have joined
export function useCreatePlayer() {
  const { name } = useAppSelector(state => state.player);
  const { gameCode, hasJoinedGame } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  // make sure that all the player fields are filled in before creating a new player
  useEffect(() => {
    if (!name || !gameCode || name === "" || gameCode === "" || hasJoinedGame) return;
    baxios
      .post(`${getProxyUrl()}/players`, {
        name: name,
        joinCode: gameCode,
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(setHasJoinedGame(true));
          // Set player cookies
          Cookies.set(`gameCode`, `${gameCode}`);
          Cookies.set(`isHost`, `false`);
          Cookies.set(`name`, `${name}`);
        } else if (response.status === 203) {
          dispatch(setHasJoinedGame(false));
          alert("This game has already begun, please try again with a different game.");
        } else {
          dispatch(setHasJoinedGame(false));
        }
        console.log(`API Call to: /players, response: ${response.status}`);
      })
      .catch(reason => {
        const status = reason.response.status;
        if (status === 409){
            // catch error if a player with the same name already exists
            dispatch(setHasJoinedGame(false));
            alert("A user with this name already exists in the game, please try again with a new name!");
            return;
        }
        else if (status === 444){
          // catch error if the game code entered does not exist
            dispatch(setHasJoinedGame(false));
            alert("The game code you entered does not exist. Please enter a valid game code.");
            return;
        }
        else {
            console.error("Error in useCreatePlayer");
            console.error(reason);
            dispatch(setHasJoinedGame(false));
        }
      });
  }, [name, gameCode]);
}
