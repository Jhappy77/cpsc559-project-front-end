import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { resetQuestionScore } from "../state/questionSlice";
import { setGotQuestion } from "../state/gameSlice";
import { setPlayerScore } from "../state/playerSlice";
import { useState } from "react";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useSubmitAnswer() {
  const { questionScore } = useAppSelector(state => state.question);
  const { gameCode } = useAppSelector(state => state.game);
  const { name } = useAppSelector(state => state.player);
  const [ toggleSubmitAnswer, setToggleSubmitAnswer ] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // submits an answer to the database if the required fields are defined in the question state
  // add the question score to the correct answer to update the players score dependent on the time
  // that they answer the question in
  useEffect(() => {
    console.log("in useSubmitAnswer useEffect");
    if (questionScore === undefined || gameCode === undefined || gameCode === "" || name === undefined || name === "")
      return;
    baxios
      .put(`${getProxyUrl()}/players/${gameCode}/${name}`, {  
        correctAnswer: questionScore,
      })
      .then(response => {
        const { status } = response;
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
        // catch error in submit answer hook
        console.error("Error in useSubmitAnswer");
        console.error(reason);
        // try again to resubmit answer
        setToggleSubmitAnswer(!toggleSubmitAnswer);
      });
  }, [questionScore, toggleSubmitAnswer, dispatch]);
}
