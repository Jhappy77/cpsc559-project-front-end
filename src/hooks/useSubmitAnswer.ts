import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { resetQuestionScore } from "../state/questionSlice";
import { setGotQuestion } from "../state/gameSlice";
import { setPlayerScore } from "../state/playerSlice";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useSubmitAnswer() {
  const { questionScore } = useAppSelector(state => state.question);
  const { gameCode } = useAppSelector(state => state.game);
  const { name } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
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
        // TODO: Handle errors better
        console.error("Unhandled error in useSubmitAnswer");
        console.error(reason);
      });
  }, [questionScore, dispatch]);
}
