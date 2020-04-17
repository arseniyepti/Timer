/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Timer.scss';
import { Button } from 'antd';
import { getMinutes, getSeconds, getMilliseconds } from '../Utils/countDownUtils';

export default class Timer extends React.Component {
  state = {
    textButton: 'Запустить',
    milliseconds: 0,
    active: false,
  };

  setStateTimer = () => {
    this.setState(({ milliseconds }) => {
      return {
        milliseconds: milliseconds + 25,
      };
    });
  };

  startTimer = () => {
    const { milliseconds } = this.state;
    let timerId;
    const setTimer = () => {
      timerId = setTimeout(() => {
        const { active } = this.state;
        if (active) {
          setTimer();
          this.setStateTimer();
        }
        if (!active || milliseconds === 3600000) {
          clearTimeout(timerId);
        }
      }, 25);
    };
    this.setState(
      ({ active }) => ({
        textButton: active ? 'Запустить' : 'Пауза',
        active: !active,
      }),
      () => {
        setTimer();
      }
    );
  };

  resetTimer = () => {
    this.setState({
      milliseconds: 0,
      active: false,
    });
  };

  render() {
    const { milliseconds, textButton } = this.state;
    return (
      <div className="tab-timer">
        <div className="tab-timer__timer">
          {`${getMinutes(milliseconds)} : ${getSeconds(milliseconds)} : 
          ${getMilliseconds(milliseconds)}`}
        </div>
        <div className="tab-timer__wrap-buttons">
          <Button
            className="tab-timer__start-button"
            onClick={this.startTimer}
            type="primary"
            shape="round"
            style={{ minWidth: '120px' }}
            icon={textButton}
            size="large"
          />
          <Button
            ghost
            className="tab-timer__reset-button"
            onClick={this.resetTimer}
            type="primary"
            shape="round"
            icon="Сбросить"
            size="large"
          />
        </div>
      </div>
    );
  }
}
