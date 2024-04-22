import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="center-content">
      <PomodoroTimer defaultPomodoroTime={3600} />
    </div>
  );
}

export default App;
