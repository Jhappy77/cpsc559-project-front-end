import { Button, Flex, VStack, Input, Progress, Text, FormControl } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreatePlayer } from "../hooks/useCreatePlayer";
import { useGetGame } from "../hooks/useGetGame";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName } from "../state/playerSlice";
import { setGameCode, setHasJoinedGame, setPollGetGameCount } from "../state/gameSlice";

const CODE_LENGTH = 5;
const MAX_NAME_LENGTH = 15;

export default function JoinPage() {
  const [gameCode, setCode] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { hasJoinedGame, gameStarted } = useAppSelector(state => state.game);
  let pollGetGameCount = 0;
  let pollStartGameTimeout: ReturnType<typeof setTimeout>;

  useCreatePlayer();
  useGetGame();

  useEffect(() => {
    if (hasJoinedGame) {
      // Start polling for game started on server
      pollStartGame();
    }
  }, [hasJoinedGame]);

  useEffect(() => {
    if (gameStarted) {
      console.log("The game has been started");
      navigate("/question");
    }
  }, [gameStarted]);

  const handleSubmit = () => {
    if (name?.length == 0) {
      alert("Please enter a name.");
      return;
    }

    if (gameCode && gameCode.length < CODE_LENGTH) {
      alert("Please enter a valid code.");
      return;
    }

    // send code using api endpoint
    dispatch(setPlayerName(name));
    dispatch(setGameCode(gameCode));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBack = () => {
    // Reset the state when we leave the page
    setCode("");
    setName("");
    dispatch(setHasJoinedGame(false));
    dispatch(setPlayerName(undefined));
    dispatch(setGameCode(undefined));

    // Go back to home
    navigate("/");
  };

  const pollStartGame = () => {
    // This change will call the API to get game
    dispatch(setPollGetGameCount(pollGetGameCount++));

    if (gameStarted) {
      // Stop polling for startGame
      clearTimeout(pollStartGameTimeout);
    } else {
      // Keep polling for startGame
      pollStartGameTimeout = setTimeout(pollStartGame, 3000);
    }
  }

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
          <Button leftIcon={<FaArrowLeft />} onClick={handleBack}>
            Back
          </Button>
          <Flex alignItems="center" justifyContent="center" display={hasJoinedGame ? "none" : "flex"}>
            <FormControl>
              <Input
                fontWeight={"bold"}
                variant="filled"
                value={name}
                onChange={handleNameChange}
                maxLength={MAX_NAME_LENGTH}
                border="2px"
                focusBorderColor="yellow"
                placeholder="Enter your name here"
                _placeholder={{ color: "white" }}
                fontSize={["lg", "2xl"]}
                padding={6}
                my={2}
                mx={3}
                width={["90%", "100%"]}
                colorScheme="whiteAlpha"
              />
              <Input
                fontWeight={"bold"}
                variant="filled"
                value={gameCode}
                onChange={handleCodeChange}
                maxLength={CODE_LENGTH}
                border="2px"
                focusBorderColor="yellow"
                placeholder="Enter code here"
                _placeholder={{ color: "white" }}
                fontSize={["lg", "2xl"]}
                padding={6}
                my={2}
                mx={3}
                width={["90%", "100%"]}
                colorScheme="whiteAlpha"
              />
              <Button
                onClick={handleSubmit}
                backgroundColor="white"
                type="submit"
                color="black"
                fontSize={["lg", "2xl"]}
                _hover={{ backgroundColor: "", color: "black" }}
                my={2}
                mx={1}
                padding={6}
              >
                Submit
              </Button>
            </FormControl>
          </Flex>
          <VStack display={hasJoinedGame ? "flex" : "none"} width="100%">
            <Text fontFamily={`'Open Sans', sans-serif`} fontSize="2xl">
              Waiting for host to start the game...
            </Text>
            <Progress height="32px" width="100%" colorScheme="whiteAlpha" isIndeterminate />
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
