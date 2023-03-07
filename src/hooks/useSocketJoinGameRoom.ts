import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { joinGameRoomAction } from "../state/socketActions/joinGameRoomAction";

export function useSocketJoinGameRoom() {
  const dispatch = useAppDispatch();
  const { gameCode } = useAppSelector(state => state.game);
  const { name } = useAppSelector(state => state.player);
  useEffect(() => {
    if (gameCode) {
      dispatch(joinGameRoomAction(gameCode, name));
    }
  }, [dispatch, gameCode]);
}
