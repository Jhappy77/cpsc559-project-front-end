import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";

export function useCreateGame() {
  const { code, questionStartCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!code) return;
    if (questionStartCallTs === undefined) return; 
    axios
      .get(`${API_URL}/games/question/${code}`)
      .then(response => {
        console.log(response);
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useCreateGame");
        console.error(reason);
      });
  }, [questionStartCallTs, dispatch]);
}
