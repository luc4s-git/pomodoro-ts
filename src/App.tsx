import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="content-center">
      <PomodoroTimer
        defaultPomodoroTime={1500} // 1500
        shortRestTime={300} // 300
        longRestTime={900} // 900
        cycles={4} // 4
      />
    </div>
  );
}

export default App;
