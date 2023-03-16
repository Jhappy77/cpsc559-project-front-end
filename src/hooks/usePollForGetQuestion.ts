import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../settings";
import { setQuestion } from "../state/questionSlice";
import { setGotQuestion, incrementPollGetQuestionCount} from "../state/gameSlice"

export function usePollForGetQuestion() {
  const { gameCode, gameStarted, hasJoinedGame, gotQuestion, pollGetQuestionCount } = useAppSelector(state => state.game);
  let hasGotQuestion = gotQuestion;
  const dispatch = useAppDispatch();

  let pollGetQuestionTimeout: ReturnType<typeof setTimeout>;

  const pollGetQuestion = () => {
      // This change will call the API to get game
      dispatch(incrementPollGetQuestionCount(1));
      if (hasGotQuestion) {
          // Stop polling for startGame
          console.log("Clearing getQuestion timeout");
          clearTimeout(pollGetQuestionTimeout);
      } else {
          // Keep polling for startGame
          console.log("Polling for question...");
          pollGetQuestionTimeout = setTimeout(pollGetQuestion, 3000);
      }
  }
  
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
            pollGetQuestion();
        }
    }, [gotQuestion]);
}
