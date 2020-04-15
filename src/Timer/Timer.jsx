/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './Timer.scss';
import { Button } from 'antd';

export default class Timer extends React.Component {
  state = {
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
      ({ active }) => ({ active: !active }),
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
    const { milliseconds } = this.state;
    const min = Math.floor(Math.floor(milliseconds / 1000) / 60);
    const sec = Math.floor(milliseconds / 1000) - min * 60;
    const millisec = Math.floor((milliseconds - sec * 1000 - min * 60 * 1000) / 10);
    return (
      <div className="tab-timer">
        <div className="tab-timer__timer">
          {`${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec} : 
          ${millisec < 10 ? `0${millisec}` : millisec}`}
        </div>
        <div className="tab-timer__wrap-buttons">
          <Button
            className="tab-timer__start-button"
            onClick={this.startTimer}
            type="primary"
            shape="round"
            icon="Запустить/Пауза"
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
