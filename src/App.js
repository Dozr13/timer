import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [timerActive, setTimerActive] = useState(false);

  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [hours, setHours] = useState("00");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (timerActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 60 / 60);

        const intSeconds =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const intMinutes =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        const intHours =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

        setSeconds(intSeconds);
        setMinutes(intMinutes);

        setHours(intHours);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerActive, counter]);

  const handleTimerReset = () => {
    setTimerActive(false);
    setSeconds("00");
    setMinutes("00");
    setHours("00");
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <main className='timer-container'>
          <section className='timer-top-section'>
            <div className='timer-display'>
              {`${hours} : ${minutes} : ${seconds}`}
            </div>
          </section>
          <section className='timer-bottom-section'>
            <div className='timer-button-container'>
              <button
                className={timerActive ? "pause-button" : "start-button"}
                onClick={() => setTimerActive(!timerActive)}
              >
                {timerActive ? "Pause" : "Start"}
              </button>
              <button className='reset-button' onClick={handleTimerReset}>
                Reset
              </button>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default App;
