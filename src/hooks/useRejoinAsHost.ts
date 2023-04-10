import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { useEffect, useState } from "react";
import { setGameCode, setGameStarted, setHasJoinedGame } from "../state/gameSlice";
import { resetLeaderboard, setRequestUpdatedLeaderboard } from "../state/leaderboardSlice";
import Cookies from "js-cookie";
import { setIsHost } from "../state/playerSlice";
import { updateSecondsLeft, updateIndex } from "../state/timeSlice";

const TIME_LIMIT_IN_SECONDS = 60;

// polled to allow the host to rejoin the game if they lose connection or refresh their page
export function useRejoinAsHost() {
  const { rejoinAsHost } = useAppSelector(state => state.player);
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const [hostRejoinTrigger, setHostRejoinTrigger] = useState(false);

  const toggleHostRejoinTrigger = () => {
    setHostRejoinTrigger(!hostRejoinTrigger);
  };

  // called when the host needs to rejoin the game via cookies
  useEffect(() => {
    const gameCodeCookie = Cookies.get("gameCode");
    if (gameCodeCookie !== undefined && rejoinAsHost) {
      // reset the fields from the game, quesiton and leaderboard state
      dispatch(setIsHost(true));
      dispatch(setGameCode(gameCodeCookie));
      dispatch(setGameStarted(true));
      dispatch(setHasJoinedGame(true));
      dispatch(resetLeaderboard());
      dispatch(setRequestUpdatedLeaderboard(false));
      // Reset the secondsLeft from cookies if we have it
      const secondsLeftCookie = Cookies.get("secondsLeft");
      if (secondsLeftCookie !== undefined) {
        const secondsLeft = Number(secondsLeftCookie);
        dispatch(updateSecondsLeft(secondsLeft));
      }
    } else {
      console.log("Unable to rejoin as host");
    }
  }, [hostRejoinTrigger]);

  useEffect(() => {
    if (rejoinAsHost && !gameCode) {
      toggleHostRejoinTrigger();
    }
  }, [rejoinAsHost]);
}
