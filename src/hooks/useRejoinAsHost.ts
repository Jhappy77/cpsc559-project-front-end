import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { useEffect, useState } from "react";
import { setGameCode, setGameStarted, setHasJoinedGame } from "../state/gameSlice";
import Cookies from "js-cookie";
import { setIsHost } from "../state/playerSlice";

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
