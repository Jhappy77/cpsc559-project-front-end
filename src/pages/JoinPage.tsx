import { Button, Flex, VStack, Input, Progress, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CODE_LENGTH = 10;

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [displayForm, setDisplayForm] = useState("flex");
  const [displayLoading, setDisplayLoading] = useState("none");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // handling after user submits code
    e.preventDefault();
    if (code.length < CODE_LENGTH) {
      alert("Please enter a valid code.");
      return;
    }
    // send code using api endpoint
    setCode("");
    setDisplayForm("none");
    setDisplayLoading("flex");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
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
            <Flex alignItems="center" display={displayForm}>
              <Input
                fontWeight={"bold"}
                variant="filled"
                value={code}
                onChange={handleChange}
                maxLength={CODE_LENGTH}
                border="2px"
                focusBorderColor="yellow"
                placeholder="Enter code here"
                _placeholder={{ color: "white" }}
                size={["md", "lg"]}
                colorScheme="whiteAlpha"
              />
              <Button
                backgroundColor="white"
                type="submit"
                color="black"
                _hover={{ backgroundColor: "", color: "black" }}
                m={4}
              >
                Submit
              </Button>
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
