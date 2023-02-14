import React from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import { IColumn, ITask } from '../../types/types';

// const InnerList = (props) => {
//   shouldComponentUpdate(nextProps) {
//     if (nextProps.tasks === props.tasks) {
//       return false;
//     }
//     return true;
//   }
  
//     return props.tasks.map((task: {id: string; content: string}, index: number) => (
//       <Task key={task.id} task={task} index={index} />
//     ));
  
// }

export const Column = (props: { column: { id: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; index: number; tasks: {id: string; content: string}[]; }) => {
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
            {(provided) => (
              <div
                className={style.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map((task: {id: string; content: string}, index: any) => (
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
