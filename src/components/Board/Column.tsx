import React from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export const Column = (props: { column: { id: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; index: number; tasks: any[]; }) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className={style.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={style.title} {...provided.dragHandleProps}>{props.column.title}</div>
          <Droppable droppableId={props.column.id} type='task'>
            {(provided, snapshot) => (
              <div
                className={style.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map((task: { id: any; }, index: any) => (
                  <Task key={task.id} task={task} index={index} />
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
