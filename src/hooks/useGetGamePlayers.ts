import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect, useState } from "react";
import { getProxyUrl } from "../settings";
import { setPlayers } from "../state/gameSlice";

export function useGetGamePlayers() {
  const { gameCode, gameCreationCallTs, gameStarted } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const [ intervalID, setIntervalID ] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (gameCode !== undefined){
        // keep getting players from backend every second 
        const interval = setInterval(() => {
            if (!gameCode) return;
            if (gameCreationCallTs === undefined) return;
            console.log('Calling with ' + getProxyUrl());
            baxios
              .get(`${getProxyUrl()}/games/players/${gameCode}`)
              .then(response => {
                const playerArr = new Array(response.data.length);
                for (let i=0; i < response.data.length; i++){
                    playerArr[i] = response.data[i].name;
                }
                dispatch(setPlayers(playerArr));
              })
              .catch(reason => {
                console.error("Unhandled error in useGetGamePlayers");
                console.error(reason);
              });
        }, 1000);
        setIntervalID(interval);
        return () => clearInterval(interval);
    }
  }, [gameCode]);

  useEffect(() => {
    // stop getting players from backend once game has started
    if (gameStarted) {
        clearInterval(intervalID);
    }
  }, [gameStarted])
}
