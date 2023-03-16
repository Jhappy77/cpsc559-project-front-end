import { Flex, VStack, Button } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useState } from "react";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppSelector } from "../state/reduxHooks";

export default function QuestionPage() {

  const { prompt, answers, index } = useAppSelector(state => state.question);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  
  usePollForGetQuestion();

  const submitAnswer = () => {
    // Submit answer to backend
  }

  const handleSetAnswer = (event: React.MouseEvent) => {
    // Set answer state
    console.log(event);
    console.log((event.target as HTMLButtonElement).getAttribute('id'));
    // setAnswer(event.currentTarget.getAttribute("id"));
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
            title={`Question ${index ? `#${index}` : ""}`}
            text={prompt ? prompt: ""}
          />
          <Answer setAnswer={handleSetAnswer} id="1" background="red" text={answers?.at(0)} />
          <Answer setAnswer={handleSetAnswer} id="2" background="blue" text={answers?.at(1)} />
          <Answer setAnswer={handleSetAnswer} id="3" background="green" text={answers?.at(2)} />
          <Answer setAnswer={handleSetAnswer} id="4" background="orange" text={answers?.at(3)} />
          <Button onClick={submitAnswer} alignSelf="end">Submit</Button>
        </VStack>
      </Flex>
    </Flex>
  );
}
