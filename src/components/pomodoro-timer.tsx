import start from '../assets/sounds/start.mp3';
import stop from '../assets/sounds/weeb-finish.mp3';

import Button from './button';
import Timer from './timer';

import { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/useInterval';
import { secondsToTime } from '../utils';

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
  cycles,
}: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);
  const [isTimeCounting, setIsTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycleManager, setCycleManager] = useState(
    new Array(cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const handleStartPomodoro = useCallback(() => {
    setIsTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(defaultPomodoroTime);
    audioStart.play();
  }, [defaultPomodoroTime]);

  const handleRest = useCallback(
    (long: boolean) => {
      setIsTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }

      audioStop.play();
    },
    [setIsTimeCounting, setWorking, longRestTime, shortRestTime]
  );

  useEffect(() => {
    if (working) document.querySelector('.pomodoro')?.classList.add('working');
    if (resting)
      document.querySelector('.pomodoro')?.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cycleManager.length > 0) {
      handleRest(false);
      cycleManager.pop();
    } else if (working && cycleManager.length <= 0) {
      handleRest(false);
      setCycleManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) handleStartPomodoro();
  }, [
    working,
    resting,
    mainTime,
    handleRest,
    completedCycles,
    cycleManager,
    cycles,
    handleStartPomodoro,
    numberOfPomodoros,
  ]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    isTimeCounting ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <h2> currently {working ? 'focusing' : 'resting'}</h2>
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
      <div className="details">
        <p>
          Cycles completed:
          <span className="display-number">{completedCycles}</span>
        </p>
        <p>
          Worked:
          <span className="display-number">
            {secondsToTime(fullWorkingTime)}
          </span>
        </p>
        <p>
          Completed Pomodoros:
          <span className="display-number">{numberOfPomodoros}</span>
        </p>
      </div>
    </div>
  );
}
