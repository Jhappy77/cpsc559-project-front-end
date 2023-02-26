import { Flex, VStack, Card, Button, Box, Text, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import Logo from '../components/Logo';
import PlayerScore from '../components/PlayerScore';
import { Link } from 'react-router-dom';

export default function LeaderboardPage(){
    return (
        <Flex backgroundImage='linear-gradient(to bottom right, green, yellow)' width='100%' height='calc(100vh)' alignItems='center' textAlign='center' justifyContent='center'>
            <Flex alignItems='center' maxW="md">
                <VStack margin="4">
                    <Logo size={["32px", "50px"]} />
                    <Card padding="10px 0 10px 0">
                        <VStack padding="10,10,10,10">
                            <Box textAlign='center'>
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
                                            <Th textAlign="end" >Score</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <PlayerScore name="Jerome" score="25"/>
                                        <PlayerScore name="BigDez" score="25"/>
                                        <PlayerScore name="Vicalous" score="20"/>
                                        <PlayerScore name="Jhappy" score="15"/>
                                        <PlayerScore name="sebsucks" score="5"/>
                                        <PlayerScore name="npc" score="0"/>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </VStack>
                    </Card>
                    <Link to="/" >
                        <Button color='white' padding={4} fontSize={["sm", "md"]} colorScheme='whiteAlpha'>Done</Button>
                    </Link>
                </VStack>
            </Flex>
        </Flex>
    );
}