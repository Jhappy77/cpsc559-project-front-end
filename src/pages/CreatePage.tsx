import { Button, Flex, VStack, Input, Text, FormControl, Card, Progress } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName, setIsHost } from "../state/playerSlice";
import { createGame, setStartGameButtonPressed, setHasJoinedGame } from "../state/gameSlice";
import { useCreateGame } from "../hooks/useCreateGame";
import { useStartGame } from "../hooks/useStartGame";
import { useGetGamePlayers } from "../hooks/useGetGamePlayers";
import PlayersCard from "../components/PlayersCard";

const MAX_NAME_LENGTH = 15;

// page for creating a new game as the host
export default function CreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [displayCreateGameBlock, setDisplayCreateGameBlock] = useState(true);
  const [displayGameCodeBlock, setDisplayGameCodeBlock] = useState(false);

  // poll to create game, start game and get game players on the create page until the
  // game is started
  useCreateGame();
  useStartGame();
  useGetGamePlayers();
  const { gameCode } = useAppSelector(state => state.game);

  // changed the html element text values when a user enters a name
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // handles the host creating a new game
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPlayerName(name));
    dispatch(createGame());
    dispatch(setIsHost(true));
    dispatch(setHasJoinedGame(true));
    setDisplayCreateGameBlock(false);
    setDisplayGameCodeBlock(true);
  };

  // handles the host starting the game
  const onStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (gameCode) {
      dispatch(setStartGameButtonPressed(true));
    }
  };

  // page elements
  return (
    <Flex
      backgroundImage="linear-gradient(to bottom right, green, yellow)"
      width="100%"
      height="calc(100vh)"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      maxWidth="100%"
    >
      <Flex alignItems="center" justifyContent="center" maxWidth="100%" maxHeight='calc(85vh)'>
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
          {displayCreateGameBlock && (
            <Flex justifyContent="center" textAlign="center">
              <form
                onSubmit={e => {
                  onSubmit(e);
                }}
              >
                <FormControl textAlign="center" marginTop={4} width="100%">
                  <Text fontSize={["lg", "xl"]} color="white">
                    Enter your name:
                  </Text>
                  <Input
                    fontWeight="bold"
                    m={2}
                    width="90%"
                    fontSize={["lg", "xl"]}
                    maxLength={MAX_NAME_LENGTH}
                    border="4px"
                    borderColor="white"
                    focusBorderColor="white"
                    value={name}
                    onChange={handleChange}
                  ></Input>
                  <Button
                    colorScheme="whiteAlpha"
                    color="white"
                    _hover={{ backgroundColor: "white", color: "black" }}
                    borderColor="white"
                    type="submit"
                    margin={2}
                  >
                    Create Game
                  </Button>
                </FormControl>
              </form>
            </Flex>
          )}
          {displayGameCodeBlock && (
            <Flex flexDirection="column" maxWidth={["100%", "80%"]} maxHeight='calc(75vh)'>
              <Card justifyContent="center" textAlign="center" bg="white" color="black" padding={4} margin={4}>
                {gameCode ? (
                  <VStack>
                    <Text fontSize={["lg", "xl"]}>Generated Game Code:</Text>
                    <Text fontSize={["xl", "2xl"]} fontWeight="bold">
                      {gameCode}
                    </Text>
                    <Text fontSize={["lg", "xl"]}>Enter this game code to join!</Text>
                  </VStack>
                ) : (
                  <VStack>
                    <Text fontSize={["sm", "md"]} margin={1} fontStyle="italic">
                      Waiting for game code...
                    </Text>
                    <Progress height="20px" width="100%" colorScheme="green" isIndeterminate />
                  </VStack>
                )}
              </Card>
              {gameCode && (
                <PlayersCard />
              )}
              {gameCode && (
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
              )}
            </Flex>
          )}
        </VStack>
      </Flex>
    </Flex>
  );
}
