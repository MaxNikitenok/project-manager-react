import React from 'react';
import style from './CentralPanel.module.css';
import { tasksSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

const CentralPanel = () => {
  const tasks = useSelector(tasksSelector);
console.log(tasks)
  return (
    <div className={style.CentralPanel}>
      
    </div>
  );
};

export default CentralPanel;
