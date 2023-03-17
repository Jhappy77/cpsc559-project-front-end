import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../settings";
import { setQuestion } from "../state/questionSlice";
import { setGotQuestion, incrementPollGetQuestionCount } from "../state/gameSlice"

export function usePollForGetQuestion() {
  const { gameCode, gameStarted, hasJoinedGame, gotQuestion, pollGetQuestionCount } = useAppSelector(state => state.game);
  let hasGotQuestion = gotQuestion;
  const dispatch = useAppDispatch();
  const [pollTrigger, setPollTrigger] = useState(false);
  let pollGetQuestionTimeout: ReturnType<typeof setTimeout>;

  const togglePollTrigger = () => { setPollTrigger(!pollTrigger) }

  useEffect(() => {
    dispatch(incrementPollGetQuestionCount(1));
    if (gotQuestion) {
      // Stop polling for startGame
      clearTimeout(pollGetQuestionTimeout);
    } else {
      // Keep polling for startGame
      pollGetQuestionTimeout = setTimeout(togglePollTrigger, 1000);
    }
  }, [pollTrigger, gotQuestion]);

  useEffect(() => {
    if (!gameCode || !gameStarted || !hasJoinedGame) return;
    axios
      .get(`${API_URL}/games/question/${gameCode}`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          dispatch(setGotQuestion(true));
          dispatch(setQuestion(data));
          hasGotQuestion = true;
          console.log(`Got question data`);
        } else {
          throw new Error("No question data recieved");
        }
        console.log(`API Call to: /games/question/${gameCode}, response: ${status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in useGetQuestion");
        console.error(reason);
      });
  }, [pollGetQuestionCount]);

  useEffect(() => {
    if (!gotQuestion && hasJoinedGame && gameStarted) {
      // Start polling for game started on server
      console.log("hello bozo");
      togglePollTrigger();
    }
  }, [gotQuestion]);
}
