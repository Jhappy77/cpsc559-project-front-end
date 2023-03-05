import { Button, Flex, VStack, Input, Progress, Text, FormControl } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSocketJoinGameRoom } from "../hooks/useSocketJoinGameRoom";
import { useCreatePlayer } from "../hooks/useCreatePlayer";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { setPlayerName } from "../state/playerSlice";
import { setGameCode } from "../state/gameSlice";

const CODE_LENGTH = 5;
const MAX_NAME_LENGTH = 15;

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [displayForm, setDisplayForm] = useState("flex");
  const [displayLoading, setDisplayLoading] = useState("none");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useCreatePlayer();
  useSocketJoinGameRoom();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // handling after user submits code
    e.preventDefault();
    if (name.length == 0) {
      alert("Please enter a name.");
      return;
    }

    if (code.length < CODE_LENGTH) {
      alert("Please enter a valid code.");
      return;
    }
    // send code using api endpoint
    dispatch(setPlayerName(name));
    dispatch(setGameCode(code));

    // this flag should be set when name is sent to the endpoint and is already taken 
    const name_taken = false;
    if (name_taken) {
      alert("Sorry, name has already been taken. Please enter another one.");
      return;
    }
    setCode("");
    setDisplayForm("none");
    setDisplayLoading("flex");
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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
          <Button leftIcon={<FaArrowLeft />} onClick={() => navigate("/")}>
            Back
          </Button>
          <form
            onSubmit={e => {
              onSubmit(e);
            }}
          >
            <Flex alignItems="center" justifyContent="center" display={displayForm}>
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
                  value={code}
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
          </form>
          <VStack display={displayLoading} width="100%">
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
