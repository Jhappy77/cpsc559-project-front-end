import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProxyUrl } from "../settings";
import { setGameStarted, incrementPollGetGameCount, setHasJoinedGame } from "../state/gameSlice"

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
        baxios
            .get(`${getProxyUrl()}/games/${gameCode}`)
            .then(response => {
                const { status, data } = response;
                console.log(data.started);
                if (status === 200) {
                    dispatch(setGameStarted(data.started));
                }
                console.log(`API Call to: /games/${gameCode}, response: ${status}`);
            })
            .catch(reason => {
                const status = reason.response.status;

                if (status === 444 || status === 454){
                    alert("Game no longer exists. Please enter a different game code.");
                    // return user to join screen to re-enter information
                    dispatch(setHasJoinedGame(false));
                }
                else {
                    console.error("Error in useGetGame");
                    console.error(reason);
                    alert("Something went wrong on our end :( \nPlease re-enter game info.");
                    // return user to join screen to re-enter information
                    dispatch(setHasJoinedGame(false));
                }
            });
    }, [pollGetGameCount]);

    useEffect(() => {
        if (hasJoinedGame) {
            // Start polling for game started on server
            togglePollTrigger();
        }
    }, [hasJoinedGame]);
}