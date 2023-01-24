import React from 'react';
import style from './CentralPanel.module.css';
import { tasksSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

const CentralPanel = () => {
  const tasks = useSelector(tasksSelector);

  const completeTasks = tasks
    .filter((t) => t.isDone)
    .map((t) => (
      <div key={t._id}>
        <p>{t.name}</p>
      </div>
    ));

  const notCompleteTasks = tasks
    .filter((t) => !t.isDone)
    .map((t) => (
      <div key={t._id}>
        <p>{t.name}</p>
      </div>
    ));

  const inProgress = tasks
    .filter((t) => t.isDone === null)
    .map((t) => (
      <div key={t._id}>
        <p>{t.name}</p>
      </div>
    ));
  return (
    <div className={style.CentralPanel}>
      <div className={style.tasks}>
        <div>{notCompleteTasks}</div>
        <div>{inProgress}</div>
        <div>{completeTasks}</div>
      </div>
    </div>
  );
};

export default CentralPanel;
