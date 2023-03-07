import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { submitQuestion } from "../state/questionSlice";

export function useGetQuestion() {
  const { gameCode, gameCreationCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!gameCode) return;
    if (gameCreationCallTs === undefined) return; 
    axios
      .get(`${API_URL}/games/question/${gameCode}`)
      .then(response => {
        console.log(response);
        const question = response.data;
        if (question) {
          dispatch(submitQuestion(question));
        } else throw new Error("No question data recieved");
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useGetQuestion");
        console.error(reason);
      });
  }, [gameCreationCallTs, dispatch]);
}
