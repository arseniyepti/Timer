import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Tabs } from 'antd';
import Timer from './Timer/Timer';
import 'antd/dist/antd.css';
import Countdown from './Countdown/Countdown';

const { TabPane } = Tabs;

function callback() {
  // console.log(key);
}

ReactDOM.render(
  <Tabs
    defaultActiveKey="1"
    type="card"
    size="large"
    onChange={callback}
    style={{ margin: '100px 300px' }}
  >
    <TabPane tab="Timer" key="1">
      <Timer />
    </TabPane>
    <TabPane tab="Countdown" key="2">
      <Countdown />
    </TabPane>
  </Tabs>,
  document.getElementById('root')
);
