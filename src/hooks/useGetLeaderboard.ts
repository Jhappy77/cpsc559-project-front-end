import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setLeaderboard, setRequestUpdatedLeaderboard } from "../state/leaderboardSlice";

export function useGetLeaderboard() {
  const { gameCode } = useAppSelector(state => state.game);
  const { requestUpdatedLeaderboard } = useAppSelector(state => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!requestUpdatedLeaderboard) return;
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
