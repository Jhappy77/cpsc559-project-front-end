import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setSubmittedAnswerTrue } from "../state/questionSlice";
import { setGotQuestion } from "../state/gameSlice";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useSubmitAnswer() {
  const { submittedAnswerTrue } = useAppSelector(state => state.question);
  const { name } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("in useSubmitAnswer useEffect");
    if (submittedAnswerTrue === undefined) return;
    axios
      .put(`${API_URL}/players/${name}`,
        {
          "correctAnswer": submittedAnswerTrue
        })
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          console.log("Answer submitted successfully");
          dispatch(setGotQuestion(false));
          dispatch(setSubmittedAnswerTrue(undefined));
        } else {
          throw new Error("Answer not submitted");
        }
        console.log(`API PUT Call to: /players/${name}, response: ${status}`);
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useSubmitAnswer");
        console.error(reason);
      });
  }, [submittedAnswerTrue, dispatch]);
}
