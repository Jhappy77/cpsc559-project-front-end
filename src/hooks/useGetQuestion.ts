import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { submitQuestion } from "../state/questionSlice";

export function useGetQuestion() {
  const { code, questionStartCallTs } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!code) return;
    if (questionStartCallTs === undefined) return; 
    axios
      .get(`${API_URL}/games/question/${code}`)
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
  }, [questionStartCallTs, dispatch]);
}
