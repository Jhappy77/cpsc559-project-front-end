import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setGameStarted } from "../state/gameSlice"

export function useGetGame() {
    const { hasJoinedGame, gameCode, pollGetGameCount } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!hasJoinedGame || !gameCode) return;
        axios
            .get(`${API_URL}/games/${gameCode}`)
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    dispatch(setGameStarted(data.started));
                }
                console.log(`API Call to: /games/${gameCode}, response: ${status}`);
            })
            .catch(reason => {
                console.error("Unhandled error in useGetGame");
                console.error(reason);
            });
    }, [pollGetGameCount]);
}