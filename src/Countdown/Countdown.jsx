import React from 'react';
import { Slider } from 'antd';
import CountdownResults from './CountdownResults';
import { generateSliderValue } from '../Utils/countDownUtils';

export default class Countdown extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
    active: false,
    disableControl: false,
    maxMinValue: 720,
    maxSecValue: 59,
    stepSlider: 15,
    activeSound: true,
  };

  setMinutes = ({ target: { value } }) => {
    this.setState(({ maxMinValue }) => ({
      minutes: value > maxMinValue ? maxMinValue : value.replace(/\D/g, ''),
    }));
  };

  setSeconds = ({ target: { value } }) => {
    this.setState(({ maxSecValue }) => ({
      seconds: value > maxSecValue ? maxSecValue : value.replace(/\D/g, ''),
    }));
  };

  handleSliderChange = (value) => {
    this.setState(
      ({ seconds, stepSlider }) => {
        if (seconds <= 45) {
          return {
            minutes: Math.floor(value / 60),
            seconds: value % stepSlider === 0 ? value : seconds,
          };
        }
        return null;
      },
      () => {
        this.setState(({ seconds, minutes }) => {
          if (seconds > 45) {
            return {
              seconds: value - minutes * 60,
            };
          }
          return null;
        });
      }
    );
  };

  resetTimer = () => {
    this.setState({
      activeSound: false,
      minutes: 0,
      seconds: 0,
      active: false,
      disableControl: false,
    });
  };

  setStateDisabled = (state) => {
    this.setState({
      disableControl: state,
    });
  };

  formatSliderValue = () => {
    const { minutes, seconds } = this.state;
    const sliderValue = `${parseFloat(minutes)} : ${
      parseFloat(seconds) < 10 ? `0${parseFloat(seconds)}` : parseFloat(seconds)
    }`;
    return sliderValue;
  };

  changeActiveSound = (value) => {
    this.setState({ activeSound: value });
  };

  render() {
    const {
      minutes,
      seconds,
      active,
      disableControl,
      maxSecValue,
      maxMinValue,
      activeSound,
    } = this.state;
    const disableInput = disableControl ? 'tab-countdown__input-disabled' : null;
    return (
      <div className="tab-countdown">
        <form>
          <div className="tab-countdown_wrap-input-min">
            <span className="tab-countdown__text-label">{`Введите минуты (max: ${maxMinValue}):`}</span>
            <input
              className={`tab-countdown__input ${disableInput}`}
              onChange={this.setMinutes}
              disabled={disableControl}
              maxLength={maxMinValue.toString().length}
              value={minutes}
            />
          </div>
          <div className="tab-countdown_wrap-input-sec">
            <span className="tab-countdown__text-label">{`Введите секунды (max: ${maxSecValue}):`}</span>
            <input
              className={`tab-countdown__input ${disableInput}`}
              onChange={this.setSeconds}
              disabled={disableControl}
              maxLength={maxSecValue.toString().length}
              value={seconds}
            />
          </div>
        </form>
        <div className="tab-countdown__slider">
          Шаг установки ползунка 15сек (max: 60 минут).
          <Slider
            onChange={this.handleSliderChange}
            disabled={disableControl}
            defaultValue={0}
            value={generateSliderValue(minutes, seconds)}
            tipFormatter={this.formatSliderValue}
            step={15}
            max={3600}
          />
        </div>
        <CountdownResults
          changeActiveSound={this.changeActiveSound}
          activeSound={activeSound}
          disableControl={disableControl}
          resetTimer={this.resetTimer}
          setStateDisabled={this.setStateDisabled}
          active={active}
          propMilliseconds={seconds * 1000 + minutes * 60 * 1000}
        />
      </div>
    );
  }
}
