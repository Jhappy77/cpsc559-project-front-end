import { Flex, VStack, Button, Text, Progress, UnorderedList } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useRef, useState } from "react";
import GameCode from "../components/GameCode";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { submitQuestion, setQuestionAnswer, submitQuestionExpired } from "../state/questionSlice";
import { setGotQuestion, setRequestNextQuestion } from "../state/gameSlice";
import { useSubmitAnswer } from "../hooks/useSubmitAnswer";
import { useNextQuestion } from "../hooks/useNextQuestion"
import Timer from "../components/Timer";
import { useRejoinAsHost } from "../hooks/useRejoinAsHost";
import Cookies from "js-cookie";
import { setIsHost, setRejoinAsHost } from "../state/playerSlice";

export default function QuestionPage() {

  usePollForGetQuestion();
  useSubmitAnswer();
  useNextQuestion();
  useRejoinAsHost();

  const { prompt, answers, index, correctAnswer } = useAppSelector(state => state.question);
  const { gameCode } = useAppSelector(state => state.game);
  const { isHost } = useAppSelector(state => state.player);
  const { secondsLeft } = useAppSelector(state => state.time);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [answerArr, setAnswerArr] = useState<Array<string>>(["red", "blue", "green", "orange"]);
  const [showAnswerButtonClicked, setShowAnswerButtonClicked] = useState<boolean>(false);
  const [requestNextQuestionButtonPressed, setRequestNextQuestionButtonPressed] = useState<boolean>(false);
  const [answered, setAnswered] = useState<boolean>(false); // flag to indicate if user answered already or not
  const dispatch = useAppDispatch();
  const pollNextQuestionIntervalID = useRef<NodeJS.Timeout | undefined>(undefined);

  let prevIndex = index;

  // On refresh: Check for gameCode cookie, if it exists,
  // attempt to rejoin at cookie state
  if (gameCode === undefined && Cookies.get('gameCode') && Cookies.get('isHost')) {
    console.log(`In refresh if: ${secondsLeft}`);
    dispatch(setRejoinAsHost(true));
    dispatch(setIsHost(true));
  }

  useEffect(() => {
    // Resets flags on page once index changes
    console.log("resetting answer colors");
    setAnswerArr(["red", "blue", "green", "orange"]);
    setShowAnswerButtonClicked(false);
    console.log(`In useEffect index: ${index}`);
    if (prevIndex !== undefined && index !== undefined) {
      setTimeExpired(false);
    }
    // setTimeExpired(false);
    setAnswer(undefined);
    setRequestNextQuestionButtonPressed(false);
    prevIndex = index;
    // Stops polling for next question 
    if (!isHost) {
      clearInterval(pollNextQuestionIntervalID.current);
    }
  }, [index])

  useEffect(() => {
    // sets timeExpired flag when secondsLeft reaches 0
    // otherwise sets the flag to false
    console.log(`In useEffect seconds Left: ${secondsLeft}`);
    if (secondsLeft === 0) {
      console.log(`IF In useEffect seconds Left: ${secondsLeft}`);
      setTimeExpired(true);
      return;
    }
    setTimeExpired(false);
  }, [secondsLeft])

  useEffect(() => {
    // if timeExpired and user is not host, show the correct answer
    // and set the interval to poll for the next question from host
    if (timeExpired && !isHost) {
      setAnswered(false);
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

  const showAnswerHost = (event: React.MouseEvent) => {
    // Host can click a button that will show the answer once time has expired
    if (timeExpired && isHost) {
      showAnswer();
      setShowAnswerButtonClicked(true);
    }
  }

  const showAnswer = () => {
    // shows the correct answer by greying out incorrect answers
    if (correctAnswer !== undefined) {
      const ansArr = new Array(4).fill("grey");
      const correctAnsColour = answerArr[correctAnswer];
      ansArr[correctAnswer] = correctAnsColour;
      setAnswerArr(ansArr);
    }
  }

  const submitAnswer = (event: React.MouseEvent) => {
    if (answer !== undefined) {
      // Submit answer to backend
      console.log("Player submitted answer");
      dispatch(setQuestionAnswer(answer));
      dispatch(submitQuestion());
      dispatch(setRequestNextQuestion(true));
      setAnswered(true);
    } else {
      alert("Please select one of the choices before submitting");
      console.log("No selected answer to submit");
    }
  }

  const nextQuestion = (event: React.MouseEvent) => {
    // Submit answer to backend
    if (!requestNextQuestionButtonPressed) {
      console.log("Next question button pressed");
      dispatch(setRequestNextQuestion(true));
      setRequestNextQuestionButtonPressed(true);
    }
  }

  const handleSetAnswer = (event: React.MouseEvent) => {
    if (timeExpired) {
      return;
    }
    // Set answer state
    console.log("Settting answer");
    console.log(event.currentTarget.id);
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
        return "orange";
      default:
        return ""
    }
  }

  const selectedAnswer = (answer: number | undefined, index: number) => {
    if (index === answer && !isHost) {
      return true;
    }
    return false;
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
            {isHost && <GameCode id={gameCode}></GameCode>}
            <Timer index={index} />
            <Question
              id="1"
              title={`Question ${index ? `#${index}` : ""}`}
              text={prompt ? prompt : ""}
            />
            <Answer setAnswer={handleSetAnswer}
              id="0"
              background={answerArr[0]}
              selected={selectedAnswer(answer, 0)}
              disabled={answered}
              text={answers?.at(0)} />
            <Answer setAnswer={handleSetAnswer}
              id="1"
              background={answerArr[1]}
              selected={selectedAnswer(answer, 1)}
              disabled={answered}
              text={answers?.at(1)} />
            <Answer setAnswer={handleSetAnswer}
              id="2"
              background={answerArr[2]}
              selected={selectedAnswer(answer, 2)}
              disabled={answered}
              text={answers?.at(2)} />
            <Answer setAnswer={handleSetAnswer}
              id="3"
              background={answerArr[3]}
              selected={selectedAnswer(answer, 3)}
              disabled={answered}
              text={answers?.at(3)} />
            {isHost ?
              timeExpired &&
              <Flex>
                <Button onClick={nextQuestion} fontWeight="extrabold" shadow="lg" border="4px" m={2}>Next Question</Button>
                {!showAnswerButtonClicked && <Button onClick={showAnswerHost} fontWeight="extrabold" shadow="lg" border="4px" m={2}>Show Answer </Button>}
              </Flex>
              :
              !timeExpired && !answered &&
              <Button onClick={submitAnswer}
                alignSelf="end"
                fontWeight="extrabold"
                fontSize="xl"
                color={getAnswerColor()}
                border="4px"
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
