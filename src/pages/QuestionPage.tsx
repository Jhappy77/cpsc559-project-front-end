import { Flex, VStack, Button, Text, Progress, Card } from "@chakra-ui/react";
import Logo from "../components/Logo";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { useEffect, useRef, useState } from "react";
import GameCode from "../components/GameCode";
import { usePollForGetQuestion } from "../hooks/usePollForGetQuestion";
import { useAppDispatch, useAppSelector } from "../state/reduxHooks";
import { submitQuestion, setQuestionAnswer, submitQuestionExpired, resetQuestionScore, resetQuestionState } from "../state/questionSlice";
import { setGotQuestion, setRequestNextQuestion, resetGameState } from "../state/gameSlice";
import { useSubmitAnswer } from "../hooks/useSubmitAnswer";
import { useNextQuestion } from "../hooks/useNextQuestion";
import { setRequestUpdatedLeaderboard, resetLeaderboard } from "../state/leaderboardSlice";
import { useGetLeaderboard } from "../hooks/useGetLeaderboard";
import Timer from "../components/Timer";
import Leaderboard from "../components/Leaderboard";
import { useRejoinAsHost } from "../hooks/useRejoinAsHost";
import { useRejoinAsPlayer } from "../hooks/useRejoinAsPlayer";
import Cookies from "js-cookie";
import { setIsHost, setRejoinAsHost, setRejoinAsPlayer } from "../state/playerSlice";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useClearCookies } from "../hooks/useClearCookies";
import { resetPlayerState } from "../state/playerSlice";
import { resetTimeState } from "../state/timeSlice";

export default function QuestionPage() {
  const { prompt, answers, index, correctAnswer } = useAppSelector(state => state.question);
  const { gameCode } = useAppSelector(state => state.game);
  const { isHost } = useAppSelector(state => state.player);
  const { secondsLeft } = useAppSelector(state => state.time);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number | undefined>(undefined);
  const [answerArr, setAnswerArr] = useState<Array<string>>(["red", "blue", "green", "orange"]);
  const [showAnswerFlag, setShowAnswer] = useState<boolean>(false);
  const [answered, setAnswered] = useState<boolean>(false); // flag to indicate if user answered already or not
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [onLastQuestion, setOnLastQuestion] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pollNextQuestionIntervalID = useRef<NodeJS.Timeout | undefined>(undefined);

  usePollForGetQuestion();
  useSubmitAnswer();
  useNextQuestion();
  useGetLeaderboard();
  useRejoinAsHost();
  useRejoinAsPlayer();

  // On refresh: Check for gameCode cookie, if it exists,
  // attempt to rejoin as a host at cookie state
  if (gameCode === undefined && Cookies.get('gameCode') && Cookies.get('isHost') === `true`) {
    dispatch(setRejoinAsHost(true));
    dispatch(setIsHost(true));
  }

  // On refresh: Check for gameCode cookie, if it exists,
  // attempt to rejoin as a player at cookie state
  if (gameCode === undefined && Cookies.get('gameCode') && Cookies.get('isHost') === `false`) {
    dispatch(setRejoinAsPlayer(true));
    dispatch(setIsHost(false));
  }

  useEffect(() => {
    // Resets flags on page once index changes
    resetFlags()

    setAnswerArr(["red", "blue", "green", "orange"]);
    if (!isHost && secondsLeft === 0) {
      showAnswer();
    }

    if (index === 12) {
      setOnLastQuestion(true);
    } else {
      setOnLastQuestion(false);
    }

  }, [index]);

  useEffect(() => {
    // sets timeExpired flag when secondsLeft reaches 0
    // otherwise sets the flag to false
    if (secondsLeft === 0) {
      setTimeExpired(true);
      if(!isHost) showAnswer();
      dispatch(setRequestUpdatedLeaderboard(true));
      return;
    }
    setTimeExpired(false);
    setAnswerArr(["red", "blue", "green", "orange"]);
  }, [secondsLeft]);

  useEffect(() => {
    // if timeExpired and user is not host, show the correct answer
    // and set the interval to poll for the next question from host
    if (secondsLeft === 0 && !isHost) {
      setAnswered(false);
      showAnswer();
      dispatch(submitQuestionExpired());
      dispatch(resetQuestionScore());
      if (onLastQuestion){
        setShowGameOver(true);
      }
      const interval = setInterval(() => {
        console.log("requesting next question");
        dispatch(setGotQuestion(false));
      }, 2000);
      pollNextQuestionIntervalID.current = interval;
      return () => clearInterval(interval);
    }
  }, [timeExpired]);

  const resetFlags = () => {
    console.log("resetting answer colors");
    setAnswerArr(["red", "blue", "green", "orange"]);
    setShowLeaderboard(false);
    setShowAnswer(false);
    setAnswer(undefined);
    setShowGameOver(false);
    // Stops polling for next question
    if (!isHost) {
      clearInterval(pollNextQuestionIntervalID.current);
    }
  }

  const showAnswerHost = (event: React.MouseEvent) => {
    // Host can click a button that will show the answer once time has expired
    if (secondsLeft === 0 && isHost) {
      showAnswer();
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
  };

  const submitAnswer = (event: React.MouseEvent) => {
    if (answer !== undefined) {
      // Submit answer to backend
      console.log("Player submitted answer");
      dispatch(setQuestionAnswer(answer));
      dispatch(submitQuestion(secondsLeft));
      dispatch(setRequestNextQuestion(true));
      setAnswered(true);
    } else {
      alert("Please select one of the choices before submitting");
      console.log("No selected answer to submit");
    }
  };

  const nextQuestion = () => {
    // Submit answer to backend
    console.log("Next question button pressed");
    dispatch(setRequestNextQuestion(true));
    setShowLeaderboard(false);
  };

  const showQuestion = () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
    }
  };

  const getLeaderboard = () => {
    // Submit answer to backend
    // reset the leaderboard if it has not already been reset
    dispatch(resetLeaderboard());
    console.log("Show leaderboard button pressed");
    dispatch(setRequestUpdatedLeaderboard(true));
    setShowLeaderboard(true);
  };

  const getPageState = (event: React.MouseEvent) => {
    // determine what page is shown
    if (timeExpired && !showAnswerFlag && !showLeaderboard) {
      // shows answer
      setShowAnswer(true);
      showAnswer();
    } else if (timeExpired && !showLeaderboard && showAnswerFlag) {
      // shows leaderboard
      getLeaderboard();
      setShowAnswer(false);
      setShowLeaderboard(true);
      if (onLastQuestion){
        setShowGameOver(true);
      }
    } else {
      // grabs next question
      nextQuestion();
      setShowLeaderboard(false);
      showQuestion();
    }
  };

  const handleSetAnswer = (event: React.MouseEvent) => {
    if (secondsLeft === 0) {
      return;
    }
    // Set answer state
    console.log("Settting answer");
    console.log(event.currentTarget.id);
    setAnswer(Number(event.currentTarget.id));
  };

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
        return "";
    }
  };

  const selectedAnswer = (answer: number | undefined, index: number) => {
    if (index === answer && !isHost) {
      return true;
    }
    return false;
  };

  const endGame = () => {
    useClearCookies();
    resetFlags();

    console.log("Resetting state in redux");
    dispatch(resetGameState());
    dispatch(resetLeaderboard());
    dispatch(resetPlayerState());
    dispatch(resetQuestionState());
    dispatch(resetTimeState());

    navigate("/");
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
      <Flex flexDirection="column" alignItems="center" maxW="md" margin="4">
        <Logo size={["32px", "50px"]} />
        {isHost && <GameCode id={gameCode}></GameCode>}
        {prompt && answers && index ? (
          <VStack>
            {showGameOver?
              (<Card variant={"elevated"} width="100%" align="center" p={2} m={2}>
                    <p>Game&rsquo;s Over</p>
                    <p><i><b>Thanks for playing!</b></i></p>
              </Card>):
              (<Timer index={index} />)
            }
            {showLeaderboard && isHost ? (
              <Leaderboard />
            ) : (
              <VStack>
                <Question id="1" title={`Question ${index ? `#${index}` : ""}`} text={prompt ? prompt : ""} />
                <Answer
                  setAnswer={handleSetAnswer}
                  id="0"
                  background={answerArr[0]}
                  selected={selectedAnswer(answer, 0)}
                  disabled={answered}
                  text={answers?.at(0)}
                />
                <Answer
                  setAnswer={handleSetAnswer}
                  id="1"
                  background={answerArr[1]}
                  selected={selectedAnswer(answer, 1)}
                  disabled={answered}
                  text={answers?.at(1)}
                />
                <Answer
                  setAnswer={handleSetAnswer}
                  id="2"
                  background={answerArr[2]}
                  selected={selectedAnswer(answer, 2)}
                  disabled={answered}
                  text={answers?.at(2)}
                />
                <Answer
                  setAnswer={handleSetAnswer}
                  id="3"
                  background={answerArr[3]}
                  selected={selectedAnswer(answer, 3)}
                  disabled={answered}
                  text={answers?.at(3)}
                />
              </VStack>
            )}
            {(() => {
              if (showGameOver) {
                return (
                  <Button
                    onClick={endGame}
                    alignSelf="center"
                    fontWeight="extrabold"
                    shadow="lg"
                    border="4px"
                    m={2}
                  >
                    Return To Main Menu
                  </Button>
                );
              } else if (isHost && timeExpired) {
                return (
                  <Button onClick={getPageState} alignSelf="end" fontWeight="extrabold" shadow="lg" border="4px" m={2}>
                    Next
                  </Button>
                );
              } else if (!isHost && !timeExpired && !answered) {
                return (
                  <Button
                    onClick={submitAnswer}
                    alignSelf="end"
                    fontWeight="extrabold"
                    fontSize="xl"
                    color={getAnswerColor()}
                    border="4px"
                    borderColor={getAnswerColor()}
                  >
                    Submit
                  </Button>
                );
              }
            })()}
          </VStack>
        ) : (
          <VStack>
            <Text fontSize={["sm", "md"]} margin={1} fontStyle="italic">
              Waiting for next question...
            </Text>
            <Progress height="20px" width="100%" colorScheme="green" isIndeterminate />
          </VStack>
        )}
      </Flex>
    </Flex>
  );
}
