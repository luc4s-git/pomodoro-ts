import Button from './button';
import Timer from './timer';

import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

interface Props {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer({ defaultPomodoroTime }: Props): JSX.Element {
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);
  const [isWorking, setIsWorking] = useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    isTimeCounting ? 1000 : null
  );

  const handlePomodoroStart = () => {
    setIsTimeCounting(!isTimeCounting);
    setIsWorking(true);
  };

  return (
    <div className={`pomodoro ${isWorking ? 'working' : 'resting'}`}>
      <h2>{isWorking ? 'Time to focus!' : 'Pomodoro'}</h2>
      <Timer time={mainTime}></Timer>
      <Button
        text={isTimeCounting ? 'pause' : 'start'}
        className="btn"
        onClick={() => handlePomodoroStart()}
      ></Button>
    </div>
  );
}
