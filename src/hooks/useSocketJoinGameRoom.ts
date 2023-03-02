import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { joinGameRoomAction } from "../state/socketActions/joinGameRoomAction";

export function useSocketJoinGameRoom() {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector(state => state.game);
  const { name } = useAppSelector(state => state.player);
  useEffect(() => {
    if (code) {
      console.log("Joining room!");
      dispatch(joinGameRoomAction(code, name));
    }
  }, [dispatch, code]);
}
