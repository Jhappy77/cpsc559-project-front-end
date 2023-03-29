import { Flex,VStack,Card,Button,Box,Text,TableContainer,Table,TableCaption,
  Thead,Tr,Th,Tbody,} from "@chakra-ui/react";
import Logo from "../components/Logo";
import PlayerScore from "../components/PlayerScore";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { usePollForGetLeaderboard } from "../hooks/usePollForGetLeaderboard";
import { setRequestNextQuestion } from "../state/gameSlice";
import { useNavigate } from "react-router-dom";

export default function LeaderboardPage() {

  const { leaders, scores } = useAppSelector(state => state.leaderboard);
  const dispatch  = useAppDispatch();
  const navigate = useNavigate();
  
  usePollForGetLeaderboard();

  const nextQuestion = (event:React.MouseEvent) => {
    // Submit answer to backend
    console.log("Next question button pressed");
    dispatch(setRequestNextQuestion(true));
    navigate("/question");
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
      <Flex alignItems="center" maxW="md">
        <VStack margin="4">
          <Logo size={["32px", "50px"]} />
          <Card padding="10px 0 10px 0">
            <VStack padding="10,10,10,10">
              <Box textAlign="center">
                <Text fontFamily={`'Comfortaa', sans-serif`} fontSize={["20px", "35px"]}>
                  Leaderboard
                </Text>
              </Box>
              <TableContainer width={["sm", "md"]} margin="10">
                <Table width={["sm", "md"]} variant="striped" colorScheme="green" size="sm">
                  <TableCaption>Thanks for playing Bahoot!</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Player name</Th>
                      <Th textAlign="end">Score</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <PlayerScore name={leaders?.at(0)} score={scores?.at(0)?.toString()}/>
                    <PlayerScore name={leaders?.at(1)} score={scores?.at(1)?.toString()}/>
                    <PlayerScore name={leaders?.at(2)} score={scores?.at(2)?.toString()}/>
                    <PlayerScore name={leaders?.at(3)} score={scores?.at(3)?.toString()}/>
                    <PlayerScore name={leaders?.at(4)} score={scores?.at(4)?.toString()}/>
                    <PlayerScore name={leaders?.at(5)} score={scores?.at(5)?.toString()}/>
                    <PlayerScore name={leaders?.at(6)} score={scores?.at(6)?.toString()}/>
                    <PlayerScore name={leaders?.at(7)} score={scores?.at(7)?.toString()}/>
                    <PlayerScore name={leaders?.at(8)} score={scores?.at(8)?.toString()}/>
                    <PlayerScore name={leaders?.at(9)} score={scores?.at(9)?.toString()}/>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Card>
          <Link to="/">
            <Button color="white" padding={4} fontSize={["sm", "md"]} colorScheme="whiteAlpha"
                    onClick={nextQuestion}>
              Next Question
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Flex>
  );
}
