import React from 'react';
import style from './CentralPanel.module.css';
import { tasksSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

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

  const Home = () => {
    return (
      <div className={style.home}>
        <div>HOME</div>
      </div>
    );
  };

  const Boards = () => {
    return (
      <div className={style.tasks}>
        <div>{notCompleteTasks}</div>
        <div>{inProgress}</div>
        <div>{completeTasks}</div>
      </div>
    );
  };

  const Calendar = () => {
    return (
      <div className={style.tasks}>
        <div>CALENDAR</div>
      </div>
    );
  };

  const NoMatch = () => {
    return (
      <div className={style.noMatch}>
        <div>NO MATCH</div>
      </div>
    );
  };



  return (
    <div className={style.CentralPanel}>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default CentralPanel;
