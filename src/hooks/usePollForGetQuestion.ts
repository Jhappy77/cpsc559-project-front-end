import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import { useEffect, useState } from "react";
import { getProxyUrl } from "../settings";
import { setQuestion } from "../state/questionSlice";
import { setGotQuestion, incrementPollGetQuestionCount, setRequestNextQuestion } from "../state/gameSlice";

// called on the question page to continually poll for a new question
// both the players and host polls for questions
export function usePollForGetQuestion() {
  const { gameCode, gameStarted, hasJoinedGame, gotQuestion, pollGetQuestionCount, requestNextQuestion } =
    useAppSelector(state => state.game);
  const { index } = useAppSelector(state => state.question);
  const dispatch = useAppDispatch();
  const [pollTrigger, setPollTrigger] = useState(false);
  let pollGetQuestionTimeout: ReturnType<typeof setTimeout>;

  const togglePollTrigger = () => {
    setPollTrigger(!pollTrigger);
  };

  // poll for start game if it has not yet started
  useEffect(() => {
    dispatch(incrementPollGetQuestionCount(1));
    if (gotQuestion) {
      // Stop polling for startGame
      clearTimeout(pollGetQuestionTimeout);
    } else {
      // Keep polling for startGame
      clearTimeout(pollGetQuestionTimeout);
      pollGetQuestionTimeout = setTimeout(togglePollTrigger, 1000);
    }
  }, [pollTrigger, gotQuestion]);

  // poll for the current game question to be displayed for players and on the host
  useEffect(() => {
    if (!gameCode || !gameStarted || !hasJoinedGame) return;
    baxios
      .get(`${getProxyUrl()}/games/question/${gameCode}`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          console.log("status 200 on usePollForGetQuestion");
          if (requestNextQuestion && index && index - 1 === data.index) {
            console.log("Already answered this question");
            return;
          }
          // if check next question is true (set from question page)
          // compare data.index to current index
          dispatch(setGotQuestion(true));
          dispatch(setQuestion(data));
          dispatch(setRequestNextQuestion(false));
          console.log(`Got question data`);
        } else {
          throw new Error("No question data recieved");
        }
        console.log(`API Call to: /games/question/${gameCode}, response: ${status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in usePollForGetQuestion");
        console.error(reason);
      });
  }, [pollGetQuestionCount]);

  useEffect(() => {
    if (!gotQuestion && hasJoinedGame && gameStarted) {
      // Start polling for game started on server
      togglePollTrigger();
    }
  }, [gotQuestion]);
}
