import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../settings";
import { setGameStarted, incrementPollGetGameCount } from "../state/gameSlice"

export function usePollForGameStart() {
    const { hasJoinedGame, gameCode, pollGetGameCount, gameStarted } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [pollTrigger, setPollTrigger] = useState(false);
    let pollStartGameTimeout: ReturnType<typeof setTimeout>;

    const togglePollTrigger = () => { setPollTrigger(!pollTrigger) }
    useEffect(() => {
        dispatch(incrementPollGetGameCount(1));
        if (gameStarted) {
            // Stop polling for startGame
            clearTimeout(pollStartGameTimeout);
            navigate("/question");
        } else {
            // Keep polling for startGame
            clearTimeout(pollStartGameTimeout);
            pollStartGameTimeout = setTimeout(togglePollTrigger, 3000);
        }
    }, [pollTrigger, gameStarted]);

    useEffect(() => {
        if (!hasJoinedGame || !gameCode) return;
        axios
            .get(`${API_URL}/games/${gameCode}`)
            .then(response => {
                const { status, data } = response;
                console.log(data.started);
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

    useEffect(() => {
        if (hasJoinedGame) {
            // Start polling for game started on server
            togglePollTrigger();
        }
    }, [hasJoinedGame]);
}