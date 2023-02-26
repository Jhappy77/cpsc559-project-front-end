import { Button, Flex, VStack, Input, Progress, Text, FormLabel, FormControl, Card } from '@chakra-ui/react';
import  Logo from '../components/Logo';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../state/reduxHooks';
import { setPlayerName } from '../state/playerSlice';

const MAX_NAME_LENGTH = 15;

export default function CreatePage(){

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [displayName, setDisplayName] = useState("flex")
    const [gameCode, setGameCode] = useState("");
    const [displayGameCode, setDisplayGameCode] = useState("none");

    const getGameCode = () => {
        // call api to get game code
        setGameCode("1234567890");
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value)
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setPlayerName(name));
        getGameCode();
        setDisplayName("none");
        setDisplayGameCode("flex");

    }

    return (
        <Flex backgroundImage='linear-gradient(to bottom right, green, yellow)' width='100%' height='calc(100vh)' alignItems='center' textAlign='center' justifyContent='center'>
            <Flex alignItems='center' justifyContent="center">
                <VStack>
                    <Logo size={["64px", "100px" ]} />
                    <Button leftIcon={<FaArrowLeft />} onClick={() => navigate("/")} marginBottom={8}>Back</Button>
                    <Flex justifyContent="center" textAlign="center" display={displayName}>
                        <form onSubmit={(e) => {onSubmit(e);}}>
                            <FormControl textAlign="center" marginTop={4} width="100%">
                                <Text fontSize={["lg", "xl"]}>Enter your name:</Text>
                                <Input fontWeight="bold" m={2} width="90%" fontSize={["lg", "xl"]} maxLength={MAX_NAME_LENGTH} border="4px" focusBorderColor="yellow" value={name} onChange={handleChange}></Input>
                                <Button backgroundColor="white" color="black" _hover={{backgroundColor: "", color: "black"}} type="submit" margin={2} >Create Game</Button>
                            </FormControl>
                        </form>
                    </Flex>
                    <Card justifyContent="center" textAlign="center" display={displayGameCode} bg="white" color='black' padding={4} margin={4}>
                        <VStack>
                            <Text fontSize={["lg", "xl"]}>Generated Game Code:</Text>
                            <Text fontSize={["xl", "2xl"]} fontWeight="bold">{gameCode}</Text>
                            <Text fontSize={["lg", "xl"]}>Enter this game code to join!</Text>
                            <Button fontSize={["lg", "xl"]} margin={8} bg="black" color="white" _hover={{color: "black", backgroundColor: "grey"}}>Start Game</Button>
                        </VStack>
                    </Card>
                </VStack>
            </Flex>
        </Flex>
    )
}