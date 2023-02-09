import React from 'react';
import style from './Column.module.css';
import { Task } from './Task';

export const Column = (props) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{props.column.title}</div>
      <div className={style.taskList}>{props.tasks.map(task => <Task key={task.id} task={task} />)}</div>
    </div>
  )
}