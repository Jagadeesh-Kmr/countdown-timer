import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: '',
  count: '',
}

class CountdownTimer extends Component {
  state = initialState

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false, timeElapsedInSeconds: 0})
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  onChangeSeconds = event => {
    this.setState({
      timeElapsedInSeconds: event.target.value,
      count: event.target.value,
    })
  }

  renderCountdownInput = () => {
    const {count} = this.state
    return (
      <input
        type="text"
        className="countdown-timer-input"
        value={count}
        onChange={this.onChangeSeconds}
      />
    )
  }

  decrementTimeElapsedInSeconds = () =>
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds - 1,
    }))

  onStartOrPauseTimer = () => {
    this.intervalId = setInterval(this.decrementTimeElapsedInSeconds, 1000)
    this.setState(prevState => ({
      count: '',
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const pauseOrPlayImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const pauseOrPlayText = isTimerRunning ? 'Pause Icon' : 'Play Icon'

    return (
      <button
        type="button"
        className="button"
        onClick={this.onStartOrPauseTimer}
      >
        <img
          src={pauseOrPlayImg}
          alt={pauseOrPlayText}
          className="timer-controller-icon"
        />
      </button>
    )
  }

  renderResetTimer = () => (
    <button
      type="button"
      className="reset-button button"
      onClick={this.onResetTimer}
    >
      <img
        alt="reset icon"
        className="timer-controller-icon"
        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
      />
    </button>
  )

  renderDisplayTimer = () => {
    const {timeElapsedInSeconds} = this.state

    return (
      <>
        <div>
          <p>{timeElapsedInSeconds}</p>
        </div>
      </>
    )
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const time = isTimerRunning
      ? `${this.renderMinutes()} : ${this.renderSeconds()}`
      : this.onStopTimer

    return (
      <>
        <div className="countdown-timer-bg-container">
          <h1 className="countdown-timer-h1">Countdown Timer</h1>
          <div className="countdown-timer-input-container">
            {this.renderCountdownInput()}
          </div>
          <div className="countdown-timer-time-container">
            {this.renderTimerController()}
            <p className="countdown-timer">{time}</p>
            {this.renderResetTimer()}
          </div>
        </div>
      </>
    )
  }
}

export default CountdownTimer
