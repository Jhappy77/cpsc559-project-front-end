import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice";
import Cookies from "js-cookie";

export function useCreatePlayer() {
    const { name } = useAppSelector(state => state.player);
    const { gameCode, hasJoinedGame } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!name || !gameCode || name === "" || gameCode === "" || hasJoinedGame) return;
        baxios
            .post(`${getProxyUrl()}/players`,
                {
                    "name": name,
                    "joinCode": gameCode
                })
            .then(response => {
                if (response.status === 201) {
                    dispatch(setHasJoinedGame(true));
                    // Set player cookies
                    Cookies.set(`gameCode`, `${gameCode}`);
                    Cookies.set(`isHost`, `false`);
                    Cookies.set(`name`, `${name}`);
                  }
                  else if (response.status === 409){
                    dispatch(setHasJoinedGame(false));
                    alert("A user with this name already exists in the game, please try again with a new name!");
                }
                else if (response.status === 444){
                    dispatch(setHasJoinedGame(false));
                    alert("The game code you entered does not exist. Please enter a valid game code.");
                }
                else {
                    dispatch(setHasJoinedGame(false));
                  }
                console.log(`API Call to: /players, response: ${response.status}`);
            })
            .catch(reason => {
                console.error("Error in useCreatePlayer");
                console.error(reason);
            });
    }, [name, gameCode]);
}
