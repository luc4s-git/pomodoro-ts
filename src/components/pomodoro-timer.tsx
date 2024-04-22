import Button from './button';
import Timer from './timer';

import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

interface Props {
  defaultPomodoroTime: number;
}

export function PomodoroTimer({ defaultPomodoroTime }: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>Currently: Working</h2>
      <Timer time={mainTime}></Timer>
      <Button
        text="start"
        className="btn"
        onClick={() => console.log('cu')}
      ></Button>
    </div>
  );
}
