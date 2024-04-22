import { formatTime } from '../utils';

interface Props {
  time: number;
}

export default function Timer(props: Props) {
  return <div className="timer">{formatTime(props.time)}</div>;
}
