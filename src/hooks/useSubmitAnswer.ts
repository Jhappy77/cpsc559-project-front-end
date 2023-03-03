import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setCode } from "../state/questionSlice";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useSubmitAnswer() {
  const { submittedAnswerTrue } = useAppSelector(state => state.question);
  const { name } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (submittedAnswerTrue === undefined) return;
    axios
      .put(`${API_URL}/players/${name}`, {"correctAnswer": submittedAnswerTrue})
      .then(response => {
        console.log(response);
        const code = response.data.playerNames;
        if (code) {
          dispatch(setCode(code));
        } else throw new Error("No question answer recieved");
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useSubmitAnswer");
        console.error(reason);
      });
  }, [submittedAnswerTrue, dispatch]);
}
