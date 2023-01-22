import React from 'react';
import style from './LeftPanel.module.css';

const LeftPanel = () => {
  return (
    <div className={style.LeftPanel}>
      <p>Home</p>
      <p>My tasks</p>
      <p>Calendar</p>
    </div>
  );
};

export default LeftPanel;
