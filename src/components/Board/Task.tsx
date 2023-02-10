import React from 'react';
import style from './Task.module.css';
import { Draggable } from 'react-beautiful-dnd';

export const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={style.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
};
