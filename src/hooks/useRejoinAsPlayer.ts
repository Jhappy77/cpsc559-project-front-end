import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { useEffect, useState } from "react";
import { setGameCode, setGameStarted, setHasJoinedGame } from "../state/gameSlice";
import { resetLeaderboard, setRequestUpdatedLeaderboard } from "../state/leaderboardSlice";
import Cookies from "js-cookie";
import { setIsHost, setPlayerName } from "../state/playerSlice";
import { updateSecondsLeft } from "../state/timeSlice";

export function useRejoinAsPlayer() {
  const { rejoinAsPlayer } = useAppSelector(state => state.player);
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const [playerRejoinTrigger, setPlayerRejoinTrigger] = useState(false);

  const togglePlayerRejoinTrigger = () => {
    setPlayerRejoinTrigger(!playerRejoinTrigger);
  };

  useEffect(() => {
    const gameCodeCookie = Cookies.get("gameCode");
    const nameCookie = Cookies.get("name");
    if (gameCodeCookie !== undefined && nameCookie !== undefined) {
      dispatch(setIsHost(false));
      dispatch(setGameCode(gameCodeCookie));
      dispatch(setPlayerName(nameCookie));
      dispatch(setGameStarted(true));
      dispatch(setHasJoinedGame(true));
      dispatch(resetLeaderboard());
      dispatch(setRequestUpdatedLeaderboard(false));
      // Reset the secondsLeft state from cookies if we have it
      const secondsLeftCookie = Cookies.get("secondsLeft");
      if (secondsLeftCookie !== undefined) {
        const secondsLeft = Number(secondsLeftCookie);
        dispatch(updateSecondsLeft(secondsLeft));
      }
    } else {
      console.log("Unable to rejoin as player");
    }
  }, [playerRejoinTrigger]);

  useEffect(() => {
    if (rejoinAsPlayer && !gameCode) {
      togglePlayerRejoinTrigger();
    }
  }, [rejoinAsPlayer]);
}
