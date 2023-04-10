import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice";
import Cookies from "js-cookie";

export function useCreatePlayer() {
  const { name } = useAppSelector(state => state.player);
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!name || !gameCode || name === "" || gameCode === "") return;
    axios
      .post(`${API_URL}/players`, {
        name: name,
        joinCode: gameCode,
      })
      .then(response => {
        if (response.status === 201 || response.status === 203) {
          dispatch(setHasJoinedGame(true));
          // Set player cookies
          Cookies.set(`gameCode`, `${gameCode}`);
          Cookies.set(`isHost`, `false`);
          Cookies.set(`name`, `${name}`);
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
