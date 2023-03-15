import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setQuestion } from "../state/questionSlice";

export function useGetQuestion() {
  const { gameCode, gameCreationCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!gameCode) return;
    console.log(gameCreationCallTs);
    //if (gameCreationCallTs === undefined) return; 
    axios
      .get(`${API_URL}/games/question/${gameCode}`)
      .then(response => {
        console.log(response);
        const questionResponse = response.data;
        if (questionResponse) {
          dispatch(setQuestion(questionResponse));
          console.log("Got question!");
        } else throw new Error("No question data recieved");
      })
      .catch(reason => {
        console.error("Unhandled error in useGetQuestion");
        console.error(reason);
      });
  }, [gameCreationCallTs, dispatch]);
}
