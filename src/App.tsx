import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="content-center">
      <PomodoroTimer
        defaultPomodoroTime={5} // 1500
        shortRestTime={2} // 300
        longRestTime={10} // 900
        cycles={4} // 4
      />
    </div>
  );
}

export default App;
