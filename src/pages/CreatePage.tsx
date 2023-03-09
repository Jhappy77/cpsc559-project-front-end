import { Button, Flex, VStack, Input, Text, FormControl, Card } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName } from "../state/playerSlice";
import { createGame } from "../state/gameSlice";
import { useCreateGame } from "../hooks/useCreateGame";
import { setGameStarted } from "../state/gameSlice";
import axios from "axios";
import { API_URL } from "../settings";

const MAX_NAME_LENGTH = 15;

export default function CreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [displayName, setDisplayName] = useState("flex");
  const [displayGameCode, setDisplayGameCode] = useState("none");

  useCreateGame();
  const { gameCode, gameStarted } = useAppSelector(state => state.game);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPlayerName(name));
    dispatch(createGame());
    setDisplayName("none");
    setDisplayGameCode("flex");
  };

  const onStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (gameCode) {
      setStartGame(true);
    }
  };

  useEffect(() => {
    if (startGame) {
      const start_game_endpoint = `${API_URL}/games/${gameCode}`;

      console.log(`Calling ${start_game_endpoint}`);
      axios.put(start_game_endpoint).then(response => {
        const status_code = response.status;
        console.log(`Call to ${start_game_endpoint} response:`);
        console.log(response);
        if (status_code === 200) {
          dispatch(setGameStarted(true));
        }
      });
    }
  }, [startGame]);

  useEffect(() => {
    if (gameStarted){
      navigate("/question");
    }
  }, [gameStarted])

  return (
    <Flex
      backgroundImage="linear-gradient(to bottom right, green, yellow)"
      width="100%"
      height="calc(100vh)"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Flex alignItems="center" justifyContent="center">
        <VStack>
          <Logo size={["64px", "100px"]} />
          <Button leftIcon={<FaArrowLeft />} onClick={() => navigate("/")} marginBottom={8}>
            Back
          </Button>
          <Flex justifyContent="center" textAlign="center" display={displayName}>
            <form
              onSubmit={e => {
                onSubmit(e);
              }}
            >
              <FormControl textAlign="center" marginTop={4} width="100%">
                <Text fontSize={["lg", "xl"]}>Enter your name:</Text>
                <Input
                  fontWeight="bold"
                  m={2}
                  width="90%"
                  fontSize={["lg", "xl"]}
                  maxLength={MAX_NAME_LENGTH}
                  border="4px"
                  focusBorderColor="yellow"
                  value={name}
                  onChange={handleChange}
                ></Input>
                <Button
                  backgroundColor="white"
                  color="black"
                  _hover={{ backgroundColor: "", color: "black" }}
                  type="submit"
                  margin={2}
                >
                  Create Game
                </Button>
              </FormControl>
            </form>
          </Flex>
          <Card
            justifyContent="center"
            textAlign="center"
            display={displayGameCode}
            bg="white"
            color="black"
            padding={4}
            margin={4}
          >
            <VStack>
              <Text fontSize={["lg", "xl"]}>Generated Game Code:</Text>
              <Text fontSize={["xl", "2xl"]} fontWeight="bold">
                {gameCode}
              </Text>
              <Text fontSize={["lg", "xl"]}>Enter this game code to join!</Text>
              <Button
                fontSize={["lg", "xl"]}
                margin={8}
                bg="black"
                color="white"
                _hover={{ color: "black", backgroundColor: "grey" }}
                onClick={e => {
                  onStartGame(e);
                }}
              >
                Start Game
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Flex>
    </Flex>
  );
}
