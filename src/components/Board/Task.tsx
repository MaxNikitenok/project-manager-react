import React from 'react';
import style from './Task.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { useDeleteTaskMutation } from '../../services/boardsApi';
import { ITask } from '../../types/types';
import { TaskDropdown } from '../TaskDropdown/TaskDropdown';

export const Task = (props: {
  boardId: string | undefined;
  columnId: string;
  task: ITask;
  index: number;
}) => {
  const [deleteTask] = useDeleteTaskMutation();

  const onDeleteTask = () => {
    deleteTask({
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props.task._id,
    });
  };

  return (
    <Draggable draggableId={props.task._id} index={props.index}>
      {(provided) => (
        <div
          className={style.wrapper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={style.container}>
            <div className={style.contentWrapper}>
              <div className={style.title}>{props.task.title}</div>
              <div className={style.description}>{props.task.description}</div>
            </div>
            <div className={style.other}>
              <div>users</div>
              <TaskDropdown onDeleteTask={onDeleteTask} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
