import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="center-content">
      <PomodoroTimer defaultPomodoroTime={1500} />
    </div>
  );
}

export default App;
