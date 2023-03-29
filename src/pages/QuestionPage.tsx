import { Flex, VStack, Button, Text, Progress } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useState } from "react";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { submitQuestion, setQuestionAnswer } from "../state/questionSlice";
import { setRequestNextQuestion } from "../state/gameSlice";
import { useSubmitAnswer } from "../hooks/useSubmitAnswer";
import { useNextQuestion } from "../hooks/useNextQuestion"
import { setLeaderboard } from "../state/leaderboardSlice";
import { usePollForGetLeaderboard } from "../hooks/usePollForGetLeaderboard";
import { useNavigate } from "react-router-dom";

export default function QuestionPage() {

  const { prompt, answers, index } = useAppSelector(state => state.question);
  const { gotQuestion } = useAppSelector(state => state.game);
  const { isHost } = useAppSelector(state => state.player);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  usePollForGetQuestion();
  useSubmitAnswer();
  useNextQuestion();

  const submitAnswer = (event:React.MouseEvent) => {
    if (answer !== undefined) {
      // Submit answer to backend
      console.log("Player submitted answer");
      dispatch(setQuestionAnswer(answer));
      dispatch(submitQuestion());
      dispatch(setRequestNextQuestion(true));
      setAnswer(undefined);
    } else {
      console.log("No selected answer to submit");
    }
  }

  const nextQuestion = (event:React.MouseEvent) => {
    // Submit answer to backend
    console.log("Leaderboard button pressed");
    dispatch(setRequestNextQuestion(true));
  }

  const handleSetAnswer = (event: React.MouseEvent) => {
    // Set answer state
    console.log("Settting answer");
    console.log(event.currentTarget.id);
    //console.log((event.target as HTMLButtonElement).getAttribute('id'));
    setAnswer(Number(event.currentTarget.id));
  }

  const getAnswerColor = () => {
    switch (answer) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "orange"
      default:
        return "white"
    }
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
        {gotQuestion && prompt && answers && index ?
          <VStack>
            <Logo size={["32px", "50px"]} />
            <Question
              id="1"
              title={`Question ${index ? `#${index}` : ""}`}
              text={prompt ? prompt : ""}
            />
            <Answer setAnswer={handleSetAnswer}
              id="0"
              background="red"
              opacity={answer === 0 ? "100%" : "50%"}
              text={answers?.at(0)} />
            <Answer setAnswer={handleSetAnswer}
              id="1"
              background="blue"
              opacity={answer === 1 ? "100%" : "50%"}
              text={answers?.at(1)} />
            <Answer setAnswer={handleSetAnswer}
              id="2"
              background="green"
              opacity={answer === 2 ? "100%" : "50%"}
              text={answers?.at(2)} />
            <Answer setAnswer={handleSetAnswer}
              id="3"
              background="orange"
              opacity={answer === 3 ? "100%" : "50%"}
              text={answers?.at(3)} />
            {isHost ?
              <Button onClick={() => navigate("/leaderboard")}
                alignSelf="end" fontWeight="extrabold" 
                shadow="lg" 
                border="4px">
                  Show Leaderboard
                  </Button>
            :
              <Button onClick={submitAnswer}
                isDisabled={answer === undefined}
                alignSelf="end"
                fontWeight="extrabold"
                fontSize="xl"
                color={getAnswerColor()}
                shadow="lg"
                border={answer !== undefined ? "4px" : "0px"}
                borderColor={getAnswerColor()}
              >
                Submit
              </Button>
             }
          </VStack>
          :
          <VStack>
            <Text fontSize={["sm", "md"]} margin={1} fontStyle="italic">
              Waiting for next question...
            </Text>
            <Progress height="20px" width="100%" colorScheme="green" isIndeterminate />
          </VStack>
        }
      </Flex>
    </Flex>
  );
}
