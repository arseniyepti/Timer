import React from 'react';
import './CountdownResults.scss';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import CountdownButtons from './CountdownButtons';

export default class CountdownResults extends React.Component {
  constructor(props) {
    super(props);
    const { active } = this.props;
    this.state = {
      milliseconds: 0,
      active,
      value: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { propMilliseconds, active } = this.props;
    if (prevProps.propMilliseconds !== propMilliseconds) {
      this.setPropsToState(propMilliseconds, active);
    }
  }

  setPropsToState = (milliseconds, active) => {
    this.setState({
      milliseconds,
      active,
    });
  };

  setStateTimer = () => {
    this.setState(({ milliseconds }) => {
      return {
        milliseconds: milliseconds - 25,
      };
    });
  };

  startTimer = () => {
    const { setStateDisabled, propMilliseconds } = this.props;
    setStateDisabled(true);
    this.setState({
      value: propMilliseconds,
    });
    const setTimer = () => {
      const { active } = this.state;
      const timerId = setTimeout(() => {
        const { milliseconds } = this.state;
        if (milliseconds > 0 && active) {
          this.setStateTimer();
          setTimer();
        } else {
          clearTimeout(timerId);
          setStateDisabled(false);
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

  render() {
    const { value, milliseconds } = this.state;
    const { resetTimer } = this.props;
    const min = Math.floor(Math.floor(milliseconds / 1000) / 60);
    const sec = Math.floor(milliseconds / 1000) - min * 60;
    return (
      <div className="tab-countdown__result">
        <div className="tab-countdown__timer">
          {`${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`}
        </div>
        <Progress
          strokeColor="#00FFFF"
          strokeWidth={20}
          percent={Math.floor((milliseconds * 100) / value)}
          status="active"
        />
        <CountdownButtons startTimer={this.startTimer} resetTimer={resetTimer} />
      </div>
    );
  }
}

CountdownResults.propTypes = {
  resetTimer: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  propMilliseconds: PropTypes.number.isRequired,
  setStateDisabled: PropTypes.func.isRequired,
};
