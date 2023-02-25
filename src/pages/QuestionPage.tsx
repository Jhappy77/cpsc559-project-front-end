import { Flex, VStack } from '@chakra-ui/react';
import Logo from '../components/Logo';
import Question from '../components/Question';
import Answer from '../components/Answer';

export default function QuestionPage(){
    return (
        <Flex backgroundImage='linear-gradient(to bottom right, green, yellow)' width='100%' height='calc(100vh)' alignItems='center' textAlign='center' justifyContent='center'>
            <Flex alignItems='center' maxW="md">
                <VStack>
                    <Logo size={["32px", "50px"]} />
                    <Question title='Question #1' text='Da minion or da bob fo today? Some will say da minion, others will tell you that it is da bob. But who can really say?'/>
                    <Answer background='red' text='1. da minion' />
                    <Answer background='blue' text='2. or da bob' />
                    <Answer background='green' text='3. or da minion again' />
                    <Answer background='orange' text='4. or da bob again' />
                </VStack>
            </Flex>
        </Flex>
    );
}