import React from 'react'
import style from './Task.module.css';

export const Task = (props) => {
  return (
    <div className={style.container}>
      {props.task.content}
    </div>
  )
}
