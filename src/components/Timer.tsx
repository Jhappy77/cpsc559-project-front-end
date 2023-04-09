import { Progress, Card } from '@chakra-ui/react';
import useCountDown from '../hooks/useCountDown';
import { useAppDispatch, useAppSelector } from '../state/reduxHooks';
import { updateIndex, updateTargetTime, updateSecondsLeft } from '../state/timeSlice';
import { setRejoinAsHost, setRejoinAsPlayer } from '../state/playerSlice';
import Cookies from 'js-cookie';

const TIME_LIMIT_IN_SECONDS = 20;
const TIME_LIMIT_IN_MS = TIME_LIMIT_IN_SECONDS * 1000;

export default function Timer(props: { index: number }) {
    const dispatch = useAppDispatch();
    const index = props.index;
    const { q_index } = useAppSelector(state => state.time);
    let { targetTime, secondsLeft } = useAppSelector(state => state.time);
    const { rejoinAsHost, rejoinAsPlayer, isHost } = useAppSelector(state => state.player);
    let rejoined = rejoinAsHost || rejoinAsPlayer;

    // if new question, start timer by creating new target time
    if (index !== q_index && index !== undefined) {
        const timeNow = new Date().getTime();
        targetTime = timeNow + TIME_LIMIT_IN_MS;
        console.log(`TIMER: New question, secondsLeft: ${secondsLeft}`);
        // Check if the host has just rejoined the game
        if (rejoined) {
            dispatch(setRejoinAsHost(false));
            dispatch(setRejoinAsPlayer(false));
            rejoined = false;
            const indexCookie = Cookies.get('index');
            console.log(`In rejoined loop, indexCookie: ${indexCookie}, index: ${index}`);
            targetTime = timeNow + secondsLeft * 1000;
            console.log(`USING cookie timer`);
            if (!isHost && indexCookie !== undefined && (Number(indexCookie)) !== index) {
                targetTime = timeNow + TIME_LIMIT_IN_MS;
                console.log(`We just joined at a different question`);
            }
            dispatch(setRejoinAsHost(false));
            dispatch(setRejoinAsPlayer(false));
            rejoined = false;
            // const indexCookie = Cookies.get('index');
            // targetTime = timeNow + secondsLeft*1000;
        }
        dispatch(updateTargetTime(targetTime));
        dispatch(updateIndex(index));
    }
    secondsLeft = useCountDown(targetTime);
    dispatch(updateSecondsLeft(secondsLeft));
    console.log(`TIMER: Updating seconds left to: ${secondsLeft}`);
    // Update seconds left cookie
    Cookies.set('index', `${index}`);
    Cookies.set('secondsLeft', secondsLeft.toString());

    return (
        <Card variant={'elevated'} width="100%" align="center" p={2} m={2}>
            <p>Time left: <b>{secondsLeft}</b> seconds</p>
            <Progress m={2} height="20px" width="90%" colorScheme="green" hasStripe min={0} max={TIME_LIMIT_IN_SECONDS} value={secondsLeft}></Progress>
        </Card>
    )

}