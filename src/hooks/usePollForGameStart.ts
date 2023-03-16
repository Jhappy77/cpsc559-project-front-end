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

    let pollStartGameTimeout: ReturnType<typeof setTimeout>;

    const pollStartGame = () => {
        // This change will call the API to get game
        dispatch(incrementPollGetGameCount(1));
        if (gameStarted) {
            // Stop polling for startGame
            console.log("clearing timeout");
            clearTimeout(pollStartGameTimeout);
        } else {
            // Keep polling for startGame
            console.log("Polling for game start...");
            pollStartGameTimeout = setTimeout(pollStartGame, 3000);
        }
    }

    useEffect(() => {
        if (gameStarted) {
            console.log("The game has been started");
            navigate("/question");
        }
    }, [gameStarted]);

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

    useEffect(() => {
        if (hasJoinedGame) {
            // Start polling for game started on server
            pollStartGame();
        }
    }, [hasJoinedGame]);
}