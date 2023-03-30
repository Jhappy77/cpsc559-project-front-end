import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setLeaderboard, setRequestUpdatedLeaderboard } from "../state/leaderboardSlice";

export function usePollForGetLeaderboard() {
  const { gameCode } = useAppSelector(state => state.game);
  const { requestUpdatedLeaderboard } = useAppSelector(state => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!requestUpdatedLeaderboard) return;
    axios
      .get(`${API_URL}/games/leaderboard/${gameCode}`)
      .then(response => {
        const { status, data } = response;
        console.log("UsePollForGetLeaderboard called");
        if (status === 200) {
          console.log("leaderboard data: ", data);
          dispatch(setLeaderboard(data));
          dispatch(setRequestUpdatedLeaderboard(false));
        } else {
          throw new Error("No leaderboard data recieved");
        }
        console.log(`API Call to: /games/leaderboard/${gameCode}, response: ${status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in usePollForGetLeaderboard");
        console.error(reason);
      });
  }, [requestUpdatedLeaderboard]);

}
