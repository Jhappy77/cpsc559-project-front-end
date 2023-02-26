import { Button, Flex, VStack } from '@chakra-ui/react';
import  Logo from '../components/Logo';

export default function StartPage(){
    return (
        <Flex backgroundImage='linear-gradient(to bottom right, green, yellow)' width='100%' height='calc(100vh)' alignItems='center' textAlign='center' justifyContent='center'>
            <Flex alignItems='center'>
                <VStack>
                    <Logo size={["64px", "100px" ]} />
                    <Button color='white' padding={8} fontSize={["large", '2xl']} colorScheme='whiteAlpha'>CREATE A NEW GAME</Button>
                    <Button color='white' padding={8} fontSize={["large", '2xl']} colorScheme='whiteAlpha'>JOIN A GAME</Button>
                </VStack>
            </Flex>
        </Flex>
    );
}