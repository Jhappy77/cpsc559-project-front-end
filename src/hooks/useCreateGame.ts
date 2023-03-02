import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setCode } from "../state/gameSlice";
import { joinGameRoomAsHostAction } from "../state/socketActions/joinGameRoomAction";

export function useCreateGame() {
  const { gameCreationCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!gameCreationCallTs) return;
    axios
      .post(`${API_URL}/games`)
      .then(response => {
        const code = response.data.joinCode;
        if (code) {
          dispatch(setCode(code));
          dispatch(joinGameRoomAsHostAction(code));
        } else throw new Error("No game code recieved");
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useCreateGame");
        console.error(reason);
      });
  }, [gameCreationCallTs, dispatch]);
}
