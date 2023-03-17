import { Flex, VStack, Button, Text, Progress } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useState } from "react";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { submitQuestion, setQuestionAnswer } from "../state/questionSlice";

export default function QuestionPage() {

  const { prompt, answers, index } = useAppSelector(state => state.question);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const dispatch = useAppDispatch();

  usePollForGetQuestion();

  const submitAnswer = (event:React.MouseEvent) => {
    // Submit answer to backend
    console.log("Player submitted answer");
    dispatch(setQuestionAnswer(answer));
    dispatch(submitQuestion());
  }

  const handleSetAnswer = (event: React.MouseEvent) => {
    // Set answer state
    console.log("Settting answer");
    console.log(event.currentTarget.id);
    //console.log((event.target as HTMLButtonElement).getAttribute('id'));
    setAnswer(Number(event.currentTarget.id));
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
        {prompt && answers && index ?
          <VStack>
            <Logo size={["32px", "50px"]} />
            <Question
              id="1"
              title={`Question ${index ? `#${index}` : ""}`}
              text={prompt ? prompt : ""}
            />
            <Answer setAnswer={handleSetAnswer} id="0" background="red" text={answers?.at(0)} />
            <Answer setAnswer={handleSetAnswer} id="1" background="blue" text={answers?.at(1)} />
            <Answer setAnswer={handleSetAnswer} id="2" background="green" text={answers?.at(2)} />
            <Answer setAnswer={handleSetAnswer} id="3" background="orange" text={answers?.at(3)} />
            <Button onClick={submitAnswer} alignSelf="end">Submit</Button>
          </VStack>
          :
          <VStack>
            <Text fontSize={["sm", "md"]} margin={1} fontStyle="italic">
              Waiting for question...
            </Text>
            <Progress height="20px" width="100%" colorScheme="green" isIndeterminate />
          </VStack>
        }
      </Flex>
    </Flex>
  );
}
