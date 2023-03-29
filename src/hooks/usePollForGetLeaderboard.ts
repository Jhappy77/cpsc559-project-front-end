import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../settings";
import { setLeaderboard } from "../state/leaderboardSlice";

export function usePollForGetLeaderboard() {
  const { gameCode } = useAppSelector(state => state.game);
  const { leaders, scores } = useAppSelector(state => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameCode) return;
    axios
      .get(`${API_URL}/games/leaderboard/${gameCode}`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          console.log("status 200 on getting leaderboard");
          console.log("leaderboard data: ", data);
          dispatch(setLeaderboard(data));

        } else {
          throw new Error("No leaderboard data recieved");
        }
        console.log(`API Call to: /games/leaderboard/${gameCode}, response: ${status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in usePollForGetLeaderboard");
        console.error(reason);
      });
  }, [leaders, scores]);

  useEffect(() => {
    if (gameStarted) {
      setStartGameButtonPressed(false); // reset flag
      navigate("/question");
    }
  }, [gameStarted]);

}
