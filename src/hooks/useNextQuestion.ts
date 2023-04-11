import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect } from "react";
import { getProxyUrl } from "../settings";
import { setGotQuestion, setRequestNextQuestion } from "../state/gameSlice";

// when someone submits an answer, dispatch an action that triggers a timestamp
// need to validate their answer
export function useNextQuestion() {
  const { gameCode, requestNextQuestion } = useAppSelector(state => state.game);
  const { name, isHost } = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("in useNextQuestion useEffect");
    if (gameCode === undefined || !requestNextQuestion || !isHost) {
      // Toggle this flag back off so that it can be toggled again
      // on the question page
      dispatch(setRequestNextQuestion(false));
      return;
    }
    baxios
      .put(`${getProxyUrl()}/games/question/${gameCode}`, {})
      .then(response => {
        const { status } = response;
        if (status === 200) {
          console.log("Skipped to next question successfully");
          dispatch(setGotQuestion(false));
          dispatch(setRequestNextQuestion(false));
        } else {
          throw new Error("Unable to skip to next question");
        }
        console.log(`API PUT Call to: /players/${name}, response: ${status}`);
      })
      .catch(reason => {
        // TODO: Handle errors better
        console.error("Unhandled error in useNextQuestion");
        console.error(reason);
      });
  }, [requestNextQuestion]);
}
