import React from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IColumn, ITask } from '../../types/types';

export const Column = (props: { column: IColumn; index: number; tasks: ITask[]; }) => {
  return (
    <Draggable draggableId={props.column._id} index={props.index}>
      {(provided) => (
        <div
          className={style.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={style.title} {...provided.dragHandleProps}>{props.column.title}</div>
          <Droppable droppableId={props.column._id} type='task'>
            {(provided) => (
              <div
                className={style.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map((task: ITask, index: any) => (
                  <Task key={task._id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
