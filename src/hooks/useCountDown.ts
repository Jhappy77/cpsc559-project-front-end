import { useState, useEffect } from "react";

// count down used in the timer
const useCountDown = (targetTime: number) => {
  const targetDate = new Date(targetTime).getTime();
  const [countDown, setCountDown] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return Math.max(0, Math.floor((countDown % (1000 * 60)) / 1000)); // return countdown, convert from ms to s
};

export default useCountDown;
