import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice"

export function useCreatePlayer() {
    const { name } = useAppSelector(state => state.player);
    const { gameCode, hasJoinedGame } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!name || !gameCode || name === "" || gameCode === "" || hasJoinedGame) return;
        axios
            .post(`${API_URL}/players`,
                {
                    "name": name,
                    "joinCode": gameCode
                })
            .then(response => {
                if (response.status === 201){
                    dispatch(setHasJoinedGame(true));
                }
                else if (response.status === 409){
                    dispatch(setHasJoinedGame(false));
                    alert("A user with this name already exists in the game, please try again with a new name!");
                }
                else if (response.status === 444){
                    dispatch(setHasJoinedGame(false));
                    alert("The game code you entered does not exist. Please enter a valid game code.");
                }
                console.log(`API Call to: /players, response: ${response.status}`);
            })
            .catch(reason => {
                console.error("Error in useCreatePlayer");
                console.error(reason);
            });
    }, [name, gameCode]);
}