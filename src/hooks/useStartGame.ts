import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import axios from "axios";
import Cookies from "js-cookie"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../settings";
import { setGameStarted, setStartGameButtonPressed } from "../state/gameSlice";

export function useStartGame() {
  const { gameCode, gameStarted, startGameButtonPressed } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (startGameButtonPressed) {
      const start_game_endpoint = `${API_URL}/games/${gameCode}`;

      console.log(`Calling ${start_game_endpoint}`);
      axios.put(start_game_endpoint).then(response => {
        const status_code = response.status;
        console.log(`Call to ${start_game_endpoint} response:`);
        console.log(response);
        if (status_code === 200) {
          dispatch(setGameStarted(true));

          // Set cookies with game code and player name
          Cookies.set(`gameCode`, `${gameCode}`);
          Cookies.set(`gameStarted`, `${gameStarted}`);
          console.log('gameCode cookie: ' + Cookies.get('gameCode'));
        }
      });
    }
  }, [startGameButtonPressed]);

  useEffect(() => {
    if (gameStarted) {
      setStartGameButtonPressed(false); // reset flag
      navigate("/question");
    }
  }, [gameStarted]);
}
