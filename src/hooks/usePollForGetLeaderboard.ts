import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../settings";
import { setQuestion } from "../state/questionSlice";

export function usePollForGetQuestion() {
  const { gameCode } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!gameCode) return;
    axios
      .get(`${API_URL}/games/leaderboard/${gameCode}`)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          console.log("status 200 on getting leaderboard");

          // if check next question is true (set from question page)
          // compare data.index to current index
          // dispatch(setGotQuestion(true));
          // dispatch(setQuestion(data));
          // dispatch(setRequestNextQuestion(false));
        } else {
          throw new Error("No leaderboard data recieved");
        }
        console.log(`API Call to: /games/leaderboard/${gameCode}, response: ${status}`);
      })
      .catch(reason => {
        console.error("Unhandled error in usePollForGetLeaderboard");
        console.error(reason);
      });
  }, [pollGetQuestionCount]);

}
