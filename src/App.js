import React, { Component, createRef } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.hoursInput = createRef();
    this.minutesInput = createRef();
    this.secondsInput = createRef();
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  convertToSeconds = (hours, minutes, seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  };

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  };

  countDown = () => {
    const { hours, minutes, seconds } = this.state;
    let convertSeconds = this.convertToSeconds(hours, minutes, seconds);

    if (convertSeconds) {
      seconds
        ? this.setState({ seconds: seconds - 1 })
        : this.setState({ seconds: 59 });

      if (convertSeconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }

      if (!minutes && hours) {
        this.setState({ minutes: 59 });
      }

      if (convertSeconds % 3600 === 0 && hours) {
        this.setState({ hours: hours - 1 });
      }
    } else {
      clearInterval(this.timer);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
  };

  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <main className='App'>
        <div className='logo-container'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <body className='App-body'>
          <section className='timer-container'>
            <div className='countdown-display'>
              <p>-Timer-</p>
              {hours}:{minutes}:{seconds}
            </div>
            <div className='input-container'>
              <input
                ref={this.hoursInput}
                type='number'
                placeholder='Hours'
                name='hours'
                onChange={this.inputHandler}
              />
              <input
                ref={this.minutesInput}
                type='number'
                placeholder='Minutes'
                name='minutes'
                onChange={this.inputHandler}
              />
              <input
                ref={this.secondsInput}
                type='number'
                placeholder='Seconds'
                name='seconds'
                onChange={this.inputHandler}
              />
            </div>

            <div className='button-container'>
              <button onClick={this.startTimer} className='start-button'>
                Start
              </button>
              <button onClick={this.stopTimer} className='pause-button'>
                Pause
              </button>
              <button onClick={this.resetTimer} className='reset-button'>
                Reset
              </button>
            </div>
          </section>
        </body>
      </main>
    );
  }
}

export default App;
