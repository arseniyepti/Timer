import React from 'react';
import { Slider } from 'antd';
import CountdownResults from './CountdownResults';

export default class Countdown extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
    active: false,
  };

  setMinutes = ({ target: { value } }) => {
    this.setState({
      minutes: value.replace(/\D/g, ''),
    });
  };

  setSeconds = ({ target: { value } }) => {
    this.setState({
      seconds: value.replace(/\D/g, ''),
    });
  };

  handleSliderChange = (value) => {
    this.setState(
      ({ seconds }) => {
        if (seconds <= 45) {
          return {
            minutes: Math.floor(value / 60),
            seconds: seconds + 15,
          };
        }
        return seconds;
      },
      () => {
        this.setState(({ seconds }) => {
          if (seconds > 45) {
            return {
              seconds: 0,
            };
          }
          return seconds;
        });
      }
    );
  };

  resetTimer = () => {
    this.setState({
      minutes: 0,
      seconds: 0,
      active: false,
    });
  };

  setStateDisabled = () => {
    this.setState(({ active }) => ({
      active: !active,
    }));
  };

  render() {
    const { minutes, seconds, active } = this.state;
    const sliderValue = parseFloat(minutes * 60) + parseFloat(seconds);
    return (
      <div className="tab-countdown">
        <form>
          <div className="tab-countdown_wrap-input-min">
            <span className="tab-countdown__text-label">Введите минуты (max: 720):</span>
            <input
              className={`tab-countdown__input ${active ? 'tab-countdown__input-disabled' : null}`}
              onChange={this.setMinutes}
              disabled={active}
              maxLength="3"
              value={minutes > 720 ? 720 : minutes}
            />
          </div>
          <div className="tab-countdown_wrap-input-sec">
            <span className="tab-countdown__text-label">Введите секунды (max: 59):</span>
            <input
              className={`tab-countdown__input ${active ? 'tab-countdown__input-disabled' : null}`}
              onChange={this.setSeconds}
              disabled={active}
              maxLength="2"
              value={seconds > 59 ? 0 : seconds}
            />
          </div>
        </form>
        <div className="tab-countdown__slider">
          Шаг установки ползунка 15сек. Приятной установки таймера.
          <Slider
            onChange={this.handleSliderChange}
            disabled={active}
            defaultValue={0}
            value={sliderValue > 3600 ? 3600 : sliderValue}
            step={15}
            max={3600}
          />
        </div>
        <CountdownResults
          resetTimer={this.resetTimer}
          setStateDisabled={this.setStateDisabled}
          active={active}
          propMilliseconds={seconds * 1000 + minutes * 60 * 1000}
        />
      </div>
    );
  }
}
