import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import baxios from "../baxios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProxyUrl } from "../settings";
import { setGameStarted, setStartGameButtonPressed } from "../state/gameSlice";

// starts a game when the host presses the 'start game' button
// triggers players to poll for the game questions
export function useStartGame() {
  const { gameCode, gameStarted, startGameButtonPressed } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (startGameButtonPressed) {
      // endpoint used for getting the game with its join code
      const start_game_endpoint = `${getProxyUrl()}/games/${gameCode}`;
      console.log(`Calling ${start_game_endpoint}`);
      baxios.put(start_game_endpoint).then(response => {
        const status_code = response.status;
        console.log(`Call to ${start_game_endpoint} response:`);
        console.log(response);
        if (status_code === 200) {
          dispatch(setGameStarted(true));

          // Set cookies for 'game code' and 'isHost'
          Cookies.set(`gameCode`, `${gameCode}`);
          Cookies.set(`isHost`, `true`);
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
