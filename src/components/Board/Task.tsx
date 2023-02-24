import React from 'react';
import style from './Task.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { useDeleteTaskMutation } from '../../services/boardsApi';

export const Task = (props: { boardId: string | undefined; columnId: string; task: any; index: number }) => {

  const [deleteTask] = useDeleteTaskMutation();

const onDeleteTask = () => {
  deleteTask({ boardId: props.boardId, columnId: props.columnId, taskId: props.task._id })
}

  return (
    <Draggable draggableId={props.task._id} index={props.index}>
      {(provided) => (
        <div
          className={style.wrapper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={style.container}>{props.task.title}</div>
          <div className={style.deleteTask} onClick={() => {onDeleteTask()}}>X</div>
        </div>
      )}
    </Draggable>
  );
};
