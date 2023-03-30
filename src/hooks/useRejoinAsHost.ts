import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { useEffect, useState } from "react";
import { setGameCode, setGameStarted, setHasJoinedGame } from "../state/gameSlice";
import Cookies from "js-cookie";
import { setIsHost } from "../state/playerSlice";
import { updateSecondsLeft, updateTargetTime } from "../state/timeSlice";

const TIME_LIMIT_IN_SECONDS = 20;
const TIME_LIMIT_IN_MS = TIME_LIMIT_IN_SECONDS * 1000;

export function useRejoinAsHost() {
  const { rejoinAsHost } = useAppSelector(state => state.player);
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const [hostRejoinTrigger, setHostRejoinTrigger] = useState(false);

  const toggleHostRejoinTrigger = () => {
    setHostRejoinTrigger(!hostRejoinTrigger);
  };

  useEffect(() => {
    const gameCodeCookie = Cookies.get("gameCode");
    if (gameCodeCookie !== undefined) {
      dispatch(setIsHost(true));
      dispatch(setGameCode(gameCodeCookie));
      dispatch(setGameStarted(true));
      dispatch(setHasJoinedGame(true));
      // Reset the timer from cookies if we have it
      const secondsLeftCookie = Cookies.get('secondsLeft');
      if (secondsLeftCookie !== undefined) {
        const secondsLeft = Number(secondsLeftCookie);
        dispatch(updateSecondsLeft(secondsLeft));
        // const timeNow = new Date().getTime();
        // const targetTime = timeNow + TIME_LIMIT_IN_MS - secondsLeft;
        // dispatch(updateTargetTime(targetTime));
        console.log(`Set seconds left to: ${secondsLeft}`);
      }
    } else {
      console.log("No cookie found for game code!");
    }
  }, [hostRejoinTrigger]);

  useEffect(() => {
    if (rejoinAsHost && !gameCode) {
      toggleHostRejoinTrigger();
    }
  }, [rejoinAsHost]);
}
