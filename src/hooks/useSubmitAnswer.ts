import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { resetQuestionScore} from "../state/questionSlice";
import { setGotQuestion } from "../state/gameSlice";
import { setPlayerScore } from "../state/playerSlice";
import { useState } from "react";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useSubmitAnswer() {
  const { questionScore } = useAppSelector(state => state.question);
  const { name } = useAppSelector(state => state.player);
  const [ toggleSubmitAnswer, setToggleSubmitAnswer ] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log("in useSubmitAnswer useEffect");
    if (questionScore === undefined) return;
    axios
      .put(`${API_URL}/players/${name}`,
        {
          "correctAnswer": questionScore
        })
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          console.log("Answer submitted successfully");
          dispatch(setGotQuestion(false));
          dispatch(resetQuestionScore());
          if (questionScore !== undefined && questionScore > 0) {
            dispatch(setPlayerScore(questionScore));
          }
        } else {
          throw new Error("Answer not submitted");
        }
        console.log(`API PUT Call to: /players/${name}, response: ${status}`);
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Error in useSubmitAnswer");
        console.error(reason);
        // try again to resubmit answer
        setToggleSubmitAnswer(!toggleSubmitAnswer);
      });
  }, [questionScore, toggleSubmitAnswer, dispatch]);
}
