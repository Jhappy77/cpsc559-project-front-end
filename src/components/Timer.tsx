import { Progress, Card } from '@chakra-ui/react';
import useCountDown from '../hooks/useCountDown';
import { useAppDispatch, useAppSelector } from '../state/reduxHooks';
import { updateIndex, updateTargetTime, updateSecondsLeft } from '../state/timeSlice';
import { setRejoinAsHost } from '../state/playerSlice';
import Cookies from 'js-cookie';

const TIME_LIMIT_IN_SECONDS = 20;
const TIME_LIMIT_IN_MS = TIME_LIMIT_IN_SECONDS * 1000;

export default function Timer(props: { index: number }) {
    const dispatch = useAppDispatch();
    const index = props.index;
    const { q_index } = useAppSelector(state => state.time);
    let { targetTime, secondsLeft } = useAppSelector(state => state.time);
    // const { secondsLeft } = useAppSelector(state => state.time);
    const { rejoinAsHost } = useAppSelector(state => state.player);
    let rejoined = rejoinAsHost;
    // let secondsLeftCookie = Cookies.get('secondsLeft');
    console.log(`Timer.tsx, Rejoined: ${rejoined}`);
    // if new question, start timer by creating new target time
    if (index !== q_index && index !== undefined) {
        const timeNow = new Date().getTime();
        targetTime = timeNow + TIME_LIMIT_IN_MS;
        if (rejoined) {
            console.log(`In rejoinsAsHostTrueTimer, target time: ${targetTime}`);
            dispatch(setRejoinAsHost(false));
            rejoined = false;
            targetTime = timeNow + secondsLeft*1000;
        }
        dispatch(updateTargetTime(targetTime));
        dispatch(updateIndex(index));
    }
    secondsLeft = useCountDown(targetTime);
    dispatch(updateSecondsLeft(secondsLeft));
    // Update seconds left cookie
    Cookies.set('secondsLeft', secondsLeft.toString());
    console.log(`Timer.tsx, seconds left cookie: ${secondsLeft.toString()}`);

    return (
        <Card variant={'elevated'} width="100%" align="center" p={2}>
            <p>Time left: <b>{secondsLeft}</b> seconds</p>
            <Progress m={2} height="20px" width="90%" colorScheme="green" hasStripe min={0} max={TIME_LIMIT_IN_SECONDS} value={secondsLeft}></Progress>
        </Card>
    )

}