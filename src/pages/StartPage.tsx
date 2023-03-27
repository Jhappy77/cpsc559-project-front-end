import { Button, Flex, VStack } from "@chakra-ui/react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function StartPage() {
  const navigate = useNavigate();
  const hasGameHostCookies = Cookies.get('isHost') === `true`;
  console.log('isHost cookie from start page: ' + Cookies.get('isHost'));

  const RejoinAsHost = () => {
    // set this property to true in the state
    // that should then trigger a hook to reset the state back to where it was
    // navigate to questionPage
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
      <Flex alignItems="center">
        <VStack>
          <Logo size={["64px", "100px"]} />
          <Button onClick={() => navigate("/create")} color="white" padding={8} fontSize={["large", "2xl"]} colorScheme="whiteAlpha">
            CREATE A NEW GAME
          </Button>
          <Button
            color="white"
            padding={8}
            fontSize={["large", "2xl"]}
            colorScheme="whiteAlpha"
            onClick={() => navigate("/join")}
          >
            JOIN A GAME
          </Button>
          {hasGameHostCookies && <Button
            color="white"
            padding={8}
            fontSize={["large", "2xl"]}
            colorScheme="whiteAlpha"
            onClick={RejoinAsHost}
          >
            REJOIN GAME AS HOST
          </Button>}
        </VStack>
      </Flex>
    </Flex>
  );
}
