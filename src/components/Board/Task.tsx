import React from 'react';
import style from './Task.module.css';
import { Draggable } from 'react-beautiful-dnd';


export const Task = (props: { task: { id: string; description: string; }; index: number; }) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <div
          className={style.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.description}
        </div>
      )}
    </Draggable>
  );
};
