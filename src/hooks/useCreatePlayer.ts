import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setHasJoinedGame } from "../state/gameSlice"

export function useCreatePlayer() {
    const { name } = useAppSelector(state => state.player);
    const { gameCode } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("In create player use effect");
        if (!name || !gameCode) return;
        axios
            .post(`${API_URL}/players`,
                {
                    "name": name,
                    "joinCode": gameCode
                })
            .then(response => {
                response.status === 201 ? dispatch(setHasJoinedGame(true)) : dispatch(setHasJoinedGame(false));
                console.log(response.status);
            })
            .catch(reason => {
                console.error("Unhandled error in useCreatePlayer");
                console.error(reason);
                alert("A user with this name already exists, please try again with a new name!");
            });
    }, [name, dispatch]);
}