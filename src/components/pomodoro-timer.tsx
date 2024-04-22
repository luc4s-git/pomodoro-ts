import start from '../assets/sounds/start.mp3';
import stop from '../assets/sounds/weeb-finish.mp3';

import Button from './button';
import Timer from './timer';

import { useEffect, useState } from 'react';
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
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) {
      document.querySelector('.pomodoro')?.classList.add('working');
    }
    if (resting) {
      document.querySelector('.pomodoro')?.classList.remove('working');
    }
  }, [working, resting]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    isTimeCounting ? 1000 : null
  );

  const handleStartPomodoro = () => {
    setIsTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(defaultPomodoroTime);
    audioStart.play();
  };

  const handleRest = (long: boolean) => {
    setIsTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(longRestTime);
    } else {
      setMainTime(shortRestTime);
    }
  };

  return (
    <div className="pomodoro">
      <Timer time={mainTime}></Timer>
      <div className="btn-menu">
        <Button
          text="work"
          className="btn"
          onClick={handleStartPomodoro}
        ></Button>
        <Button
          text="rest"
          className="btn"
          onClick={() => handleRest(false)}
        ></Button>
        <Button
          text={isTimeCounting ? 'pause' : 'play'}
          className={!working && !resting ? 'hidden' : 'btn'}
          onClick={() => setIsTimeCounting(!isTimeCounting)}
        ></Button>
      </div>
    </div>
  );
}
