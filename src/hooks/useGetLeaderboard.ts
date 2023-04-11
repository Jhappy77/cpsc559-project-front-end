import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setLeaderboard, setRequestUpdatedLeaderboard } from "../state/leaderboardSlice";

// polls for the leaderboard after the host moves to the next question
export function useGetLeaderboard() {
  const { gameCode } = useAppSelector(state => state.game);
  const { requestUpdatedLeaderboard } = useAppSelector(state => state.leaderboard);
  const dispatch = useAppDispatch();

  // only poll for a new leaderboard if the leaderboard is requested
  // it will poll up to the top 10 players in a game based on their score
  useEffect(() => {
    if (!requestUpdatedLeaderboard || gameCode === undefined || gameCode === "") return;
    baxios
      .get(`${getProxyUrl()}/games/leaderboard/${gameCode}`)
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
