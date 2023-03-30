import { Progress, Card } from '@chakra-ui/react';
import useCountDown from '../hooks/useCountDown';
import { useAppDispatch, useAppSelector } from '../state/reduxHooks';
import { updateIndex, updateTargetTime, updateSecondsLeft } from '../state/timeSlice';

const TIME_LIMIT_IN_SECONDS = 10;
const TIME_LIMIT_IN_MS = TIME_LIMIT_IN_SECONDS * 1000;

export default function Timer(props: {index: number}){
    const dispatch = useAppDispatch();
    const index = props.index;
    const { q_index } = useAppSelector(state => state.time);
    let { targetTime } = useAppSelector(state => state.time);

    // if new question, start timer by creating new target time
    if (index !== q_index && index !== undefined){
        const timeNow = new Date().getTime();
        targetTime = timeNow + TIME_LIMIT_IN_MS;
        dispatch(updateIndex(index));
        dispatch(updateTargetTime(targetTime));
    }
    const secondsLeft = useCountDown(targetTime);
    dispatch(updateSecondsLeft(secondsLeft));


    return (
        <Card variant={'elevated'} width="100%" align="center" p={2} m={2}>
            <p>Time left: <b>{secondsLeft}</b> seconds</p>
            <Progress m={2} height="20px" width="90%" colorScheme="green" hasStripe min={0} max={TIME_LIMIT_IN_SECONDS} value={secondsLeft}></Progress> 
        </Card>
    )

}