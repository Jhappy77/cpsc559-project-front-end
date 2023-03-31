import { Text, VStack, Card, Box, Table, TableContainer, TableCaption, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import PlayerScore from "./PlayerScore";
import { useAppSelector } from "../state/reduxHooks";

export default function Leaderboard() {
    const { leaders, scores } = useAppSelector(state => state.leaderboard);

    return (
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
                            <PlayerScore name={leaders?.at(0)} score={scores?.at(0)} />
                            <PlayerScore name={leaders?.at(1)} score={scores?.at(1)} />
                            <PlayerScore name={leaders?.at(2)} score={scores?.at(2)} />
                            <PlayerScore name={leaders?.at(3)} score={scores?.at(3)} />
                            <PlayerScore name={leaders?.at(4)} score={scores?.at(4)} />
                            <PlayerScore name={leaders?.at(5)} score={scores?.at(5)} />
                            <PlayerScore name={leaders?.at(6)} score={scores?.at(6)} />
                            <PlayerScore name={leaders?.at(7)} score={scores?.at(7)} />
                            <PlayerScore name={leaders?.at(8)} score={scores?.at(8)} />
                            <PlayerScore name={leaders?.at(9)} score={scores?.at(9)} />
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </Card>
    );
}