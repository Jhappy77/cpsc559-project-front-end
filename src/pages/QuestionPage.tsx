import { Flex, VStack, Button } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useGetQuestion } from "../hooks/useGetQuestion";
import { useAppSelector } from "../state/reduxHooks";

export default function QuestionPage() {

  const {question} = useAppSelector(state => state.game);
  
  useGetQuestion();

  const submitAnswer = () => {
    // Submit answer to backend

  }

  const setAnswer = () => {
    // Set answer state
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
      <Flex alignItems="center" maxW="md" margin="4">
        <VStack>
          <Logo size={["32px", "50px"]} />
          <Question
            id="1"
            title="Question #1"
            text="Da minion or da bob fo today? Some will say da minion, others will tell you that it is da bob. But who can really say?"
          />
          <Answer setAnswer={setAnswer} id="1" background="red" text="1. da minion" />
          <Answer setAnswer={setAnswer} id="2" background="blue" text="2. or da bob" />
          <Answer setAnswer={setAnswer} id="3" background="green" text="3. or da minion again" />
          <Answer setAnswer={setAnswer} id="4" background="orange" text="4. or da bob again" />
          <Button onClick={submitAnswer} alignSelf="end">Submit</Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
