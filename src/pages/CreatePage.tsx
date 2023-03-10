import { Button, Flex, VStack, Input, Text, FormControl, Card, Progress} from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName } from "../state/playerSlice";
import { createGame } from "../state/gameSlice";
import { useCreateGame } from "../hooks/useCreateGame";

const MAX_NAME_LENGTH = 15;

export default function CreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("flex");
  const [displayGameCode, setDisplayGameCode] = useState("none");

  useCreateGame();
  const { gameCode } = useAppSelector(state => state.game);

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
          <Button leftIcon={<FaArrowLeft />} onClick={() => navigate("/")} marginBottom={8} colorScheme="whiteAlpha" color="white">
            Back
          </Button>
          <Flex justifyContent="center" textAlign="center" display={displayName}>
            <form
              onSubmit={e => {
                onSubmit(e);
              }}
            >
              <FormControl textAlign="center" marginTop={4} width="100%">
                <Text fontSize={["lg", "xl"]} color="white" >Enter your name:</Text>
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
          <Card
            justifyContent="center"
            textAlign="center"
            display={displayGameCode}
            bg="white"
            color="black"
            padding={4}
            margin={4}
          >
              { gameCode? 
                <VStack>
                  <Text fontSize={["lg", "xl"]}>Generated Game Code:</Text>
                  <Text fontSize={["xl", "2xl"]} fontWeight="bold">
                    { gameCode }
                  </Text>
                  <Text fontSize={["lg", "xl"]}>Enter this game code to join!</Text>
                  <Button
                    fontSize={["lg", "xl"]}
                    margin={8}
                    bg="black"
                    color="white"
                    _hover={{ color: "black", backgroundColor: "grey" }}
                  >
                    Start Game
                  </Button>
                </VStack>
                 :
                <VStack>
                  <Text fontSize={["sm", "md"]} margin={1} fontStyle="italic">
                    Waiting for game code...
                  </Text>
                  <Progress height="20px" width="100%" colorScheme="green" isIndeterminate />
                </VStack>
                
              }
          </Card>
        </VStack>
      </Flex>
    </Flex>
  );
}
