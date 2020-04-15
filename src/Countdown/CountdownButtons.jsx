import React from 'react';
import './CountdownButtons.scss';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CountdownButtons = ({ startTimer, resetTimer }) => (
  <div className="tab-countdown__wrap-buttons">
    <Button
      block
      className="tab-countdown__start-button"
      onClick={startTimer}
      type="primary"
      shape="round"
      icon="Запустить/Пауза"
      size="large"
    />
    <Button
      ghost
      className="tab-countdown__reset-button"
      onClick={resetTimer}
      type="primary"
      shape="round"
      icon="Сбросить"
      size="large"
    />
  </div>
);

CountdownButtons.propTypes = {
  startTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};
export default CountdownButtons;
