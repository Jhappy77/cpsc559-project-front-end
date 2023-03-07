import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setGameStarted } from "../state/gameSlice"

export function useGetGame() {
    const { hasJoinedGame, gameCode } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("in get game hook");
        if (!hasJoinedGame || !gameCode) return;
        axios
            .get(`${API_URL}/games/${gameCode}`)
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    dispatch(setGameStarted(data.started));
                }
                console.log(status);
            })
            .catch(reason => {
                console.error("Unhandled error in useCreatePlayer");
                console.error(reason);
                alert("A user with this name already exists, please try again with a new name!");
            });
    }, [hasJoinedGame, dispatch]);
}