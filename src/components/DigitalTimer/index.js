import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    time: 25,
    sec: 0,
    min: 25,
    start: false,
  }

  changeStartTimer = () => {
    const {sec, time} = this.state
    if (sec === 0 && time !== 0) {
      this.setState({sec: 59})
      this.setState(prevState => ({time: prevState.time - 1}))
    }
    if (sec !== 0) {
      this.setState(prevState => ({sec: prevState.sec - 1}))
    }
    if (sec === 0 && time === 0) {
      clearInterval(this.intervalId)
    }
  }

  onStartOrPause = () => {
    const {time, sec} = this.state
  }

  onIncreament = () => {
    const {start} = this.state
    if (start === false) {
      this.setState(prevState => ({
        time: prevState.time + 1,
        min: prevState.min + 1,
      }))
    }
  }

  onDecrement = () => {
    const {start} = this.state
    if (start === false) {
      this.setState(prevState => ({
        time: prevState.time - 1,
        min: prevState.min - 1,
      }))
    }
  }

  changeStart = () => {
    const {start} = this.state

    if (start === false) {
      this.intervalId = setInterval(this.changeStartTimer, 1000)
      this.setState(prevState => ({start: !prevState.start}))
    } else {
      clearInterval(this.intervalId)
      this.setState(prevState => ({start: !prevState.start}))
    }
  }

  onReset = () => {
    const {start} = this.state

    this.setState({
      start: false,
      sec: 0,
      time: 25,
    })

    clearInterval(this.intervalId)
  }

  render() {
    const {time, start, sec, min} = this.state
    const text1 = start ? 'Running' : 'Paused'
    const text = start ? 'Pause' : 'Start'
    const icon = start ? 'pause icon' : 'play icon'

    const finalMin = time < 10 ? ` 0${time}` : time
    const finalSec = sec < 10 ? `0${sec}` : sec
    const isStart = start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="bg-color">
        <h1 className="heading">Digital Timer</h1>
        <div className="for-flex2">
          <div className="bg-timer1">
            <div className="timer">
              <h1 className="time-heading">
                {finalMin}:{finalSec}
              </h1>
              <p className="timer-status">{text1}</p>
            </div>
          </div>
          <div>
            <div className="startAndPause">
              <div className="for-flex">
                <img src={isStart} alt={icon} className="start-image" />
                <button
                  className="start-text button1"
                  onClick={this.changeStart}
                  type="button"
                >
                  {text}
                </button>
              </div>
              <div className="for-flex">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-image"
                />
                <button
                  className="reset-text button1"
                  onClick={this.onReset}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="reset-text">Set Timer Limit</p>
            <div className="increaseDecrease">
              <button
                className="button"
                type="button"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="paragraph">{min}</p>
              <button
                className="button"
                type="button"
                onClick={this.onIncreament}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
