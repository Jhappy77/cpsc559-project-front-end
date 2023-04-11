import { Button, Flex, VStack, Input, Progress, Text, FormControl } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreatePlayer } from "../hooks/useCreatePlayer";
import { usePollForGameStart } from "../hooks/usePollForGameStart";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName } from "../state/playerSlice";
import { setGameCode, setHasJoinedGame } from "../state/gameSlice";
import { useClearCookies } from "../hooks/useClearCookies";

const CODE_LENGTH = 5;
const MAX_NAME_LENGTH = 15;

export default function JoinPage() {
  const [gameCode, setCode] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { hasJoinedGame } = useAppSelector(state => state.game);

  useCreatePlayer();
  usePollForGameStart();

  const checkValidGameCode = (gameCode: string) => {
    const modifiedGameCode = gameCode.trim();
    if (modifiedGameCode.length !== 5 || !/^[a-zA-Z0-9]+$/.test(modifiedGameCode)) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (name?.length == 0) {
      alert("Please enter a name.");
      return;
    }

    if ((gameCode && gameCode.length < CODE_LENGTH) || !gameCode || !checkValidGameCode(gameCode)) {
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

  const resetStates = () => {
    // Reset the state when we leave the page
    setCode("");
    setName("");
    dispatch(setHasJoinedGame(false));
    dispatch(setPlayerName(undefined));
    dispatch(setGameCode(undefined));
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
          <Button
            leftIcon={<FaArrowLeft />}
            onClick={() => navigate("/")}
            marginBottom={8}
            colorScheme="whiteAlpha"
            color="white"
          >
            Back
          </Button>
          <Flex alignItems="center" justifyContent="center" display={hasJoinedGame ? "none" : "flex"} maxWidth="80%">
            <FormControl>
              <Input
                fontWeight={"bold"}
                value={name}
                onChange={handleNameChange}
                maxLength={MAX_NAME_LENGTH}
                border="2px"
                borderColor="white"
                focusBorderColor="white"
                placeholder="Enter your name here"
                _placeholder={{ color: "white" }}
                color="white"
                fontSize={["lg", "2xl"]}
                padding={6}
                my={2}
                mx={3}
                width={["90%", "100%"]}
              />
              <Input
                fontWeight={"bold"}
                value={gameCode}
                onChange={handleCodeChange}
                maxLength={CODE_LENGTH}
                border="2px"
                borderColor="white"
                focusBorderColor="white"
                placeholder="Enter code here"
                _placeholder={{ color: "white" }}
                fontSize={["lg", "2xl"]}
                padding={6}
                my={2}
                mx={3}
                width={["90%", "100%"]}
              />
              <Button
                onClick={handleSubmit}
                colorScheme="whiteAlpha"
                borderColor="white"
                type="submit"
                color="white"
                fontSize={["lg", "2xl"]}
                _hover={{ backgroundColor: "white", color: "black" }}
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
            <Progress height="32px" width="100%" colorScheme="green" isIndeterminate />
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}
