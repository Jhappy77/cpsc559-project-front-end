import { useState, useEffect } from 'react';

const useCountDown = (targetTime: number) => {

    const targetDate = new Date(targetTime).getTime();
    console.log(`In useCountdown`);
    const [countDown, setCountDown] = useState(
        targetDate - new Date().getTime()
    );

    useEffect(() => {
        console.log(`In useCountdown useEffect`);
        const interval = setInterval(() => {
            setCountDown(targetDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);

    }, [targetDate]);

    return Math.max(0, Math.floor((countDown % (1000 * 60)) / 1000)); // return countdown, convert from ms to s

}

export default useCountDown;