import start from '../assets/sounds/start.mp3';
import stop from '../assets/sounds/weeb-finish.mp3';

import Button from './button';
import Timer from './timer';

import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

const audioStart = new Audio(start);
const audioStop = new Audio(stop);

interface Props {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer({
  defaultPomodoroTime,
  shortRestTime,
  longRestTime,
}: Props): JSX.Element {
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);
  const [isWorking, setIsWorking] = useState(false);
  const [focusAt, setFocusAt] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    isTimeCounting ? 1000 : null
  );

  const handlePomodoroStart = () => {
    setIsTimeCounting(!isTimeCounting);
    setIsWorking(true);
    audioStart.play();
  };

  return (
    <div className={`pomodoro ${isWorking ? 'working' : 'resting'}`}>
      <div className="pomodoro-mode">
        <Button
          text="pomodoro"
          className={`btn-ghost ${focusAt === 0 && 'focus'}`}
          onClick={() => {
            setMainTime(defaultPomodoroTime);
            setIsTimeCounting(false);
            setFocusAt(0);
          }}
        ></Button>
        <Button
          text="short break"
          className={`btn-ghost ${focusAt === 1 && 'focus'}`}
          onClick={() => {
            setMainTime(shortRestTime);
            setIsTimeCounting(false);
            setFocusAt(1);
          }}
        ></Button>
        <Button
          text="long break"
          className={`btn-ghost ${focusAt === 2 && 'focus'}`}
          onClick={() => {
            setMainTime(longRestTime);
            setIsTimeCounting(false);
            setFocusAt(2);
          }}
        ></Button>
      </div>
      <Timer time={mainTime}></Timer>
      <div className="btn-menu">
        <Button
          text={isTimeCounting ? 'pause' : 'start'}
          className="btn"
          onClick={() => handlePomodoroStart()}
        ></Button>
      </div>
    </div>
  );
}
