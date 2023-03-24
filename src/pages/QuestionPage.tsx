import { Flex, VStack, Button, Text, Progress } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useRef, useState } from "react";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { submitQuestion, setQuestionAnswer, submitQuestionExpired } from "../state/questionSlice";
import { setGotQuestion, setRequestNextQuestion } from "../state/gameSlice";
import { useSubmitAnswer } from "../hooks/useSubmitAnswer";
import { useNextQuestion } from "../hooks/useNextQuestion"
import Timer from "../components/Timer";

export default function QuestionPage() {

  const { prompt, answers, index, correctAnswer } = useAppSelector(state => state.question);
  const { isHost } = useAppSelector(state => state.player);
  const { secondsLeft } = useAppSelector(state => state.time); 
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [answerArr, setAnswerArr] = useState<Array<string>>(["red", "blue", "green", "orange"]);
  const [showAnswerButtonClicked, setShowAnswerButtonClicked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const pollNextQuestionIntervalID = useRef<NodeJS.Timeout | undefined>(undefined);

  usePollForGetQuestion();
  useSubmitAnswer();
  useNextQuestion();

  useEffect( () => {
    // Resets flags on page once index changes
    console.log("resetting answer colors");
    setAnswerArr(["red", "blue", "green", "orange"]);
    setShowAnswerButtonClicked(false);
    setTimeExpired(false);
    // Stops polling for next question 
    if (!isHost){
      clearInterval(pollNextQuestionIntervalID.current);
    }
  }, [index])

  useEffect( () => {
    // sets timeExpired flag when secondsLeft reaches 0
    // otherwise sets the flag to false
    if (secondsLeft === 0){
      setTimeExpired(true);
      return;
    }
    setTimeExpired(false);
  }, [secondsLeft])

  useEffect( () => {
    // if timeExpired and user is not host, show the correct answer
    // and set the interval to poll for the next question from host
    if (timeExpired && !isHost){
      showAnswer();
      dispatch(submitQuestionExpired());
      const interval = setInterval(() => {
        console.log("requesting next question")
        dispatch(setGotQuestion(false));
      }, 2000);
      pollNextQuestionIntervalID.current = interval
      return () => clearInterval(interval);
    }
  }, [timeExpired])

  const showAnswerHost = (event:React.MouseEvent) => {
    // Host can click a button that will show the answer once time has expired
    if (timeExpired && isHost){
      showAnswer();
      setShowAnswerButtonClicked(true);
    }
  }

  const showAnswer = () => {
    // shows the correct answer by greying out incorrect answers
    if (correctAnswer !== undefined){
      const ansArr = new Array(4).fill("grey");
      const correctAnsColour = answerArr[correctAnswer];
      ansArr[correctAnswer] = correctAnsColour;
      setAnswerArr(ansArr);
    }
  }

  const submitAnswer = (event:React.MouseEvent) => {
    // Submit answer to backend
    console.log("Player submitted answer");
    dispatch(setQuestionAnswer(answer));
    dispatch(submitQuestion());
    dispatch(setRequestNextQuestion(true));
  }

  const nextQuestion = (event:React.MouseEvent) => {
    // Submit answer to backend
    console.log("Next question button pressed");
    dispatch(setRequestNextQuestion(true));
  }

  const handleSetAnswer = (event: React.MouseEvent) => {
    if (timeExpired){
      return;
    }
    // Set answer state
    console.log("Settting answer");
    console.log(event.currentTarget.id);
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
            <Timer index={index}/>
            <Question
              id="1"
              title={`Question ${index ? `#${index}` : ""}`}
              text={prompt ? prompt : ""}
            />
            <Answer setAnswer={handleSetAnswer} id="0" background={answerArr[0]} text={answers?.at(0)} />
            <Answer setAnswer={handleSetAnswer} id="1" background={answerArr[1]} text={answers?.at(1)} />
            <Answer setAnswer={handleSetAnswer} id="2" background={answerArr[2]} text={answers?.at(2)} />
            <Answer setAnswer={handleSetAnswer} id="3" background={answerArr[3]} text={answers?.at(3)} />
            {isHost ?
              timeExpired && // show next question and show answer buttons only if time has expired
              <Flex>
                <Button onClick={nextQuestion} m={2}>Next Question</Button>
                {!showAnswerButtonClicked && <Button onClick={showAnswerHost} m={2}>Show Answer </Button>}
              </Flex> 
            :
              !timeExpired && <Button onClick={submitAnswer} alignSelf="end">Submit</Button>
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
