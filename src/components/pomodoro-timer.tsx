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

  return <div>{mainTime}</div>;
}
