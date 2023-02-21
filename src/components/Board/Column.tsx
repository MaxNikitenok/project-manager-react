import React, { useEffect } from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useDeleteColumnMutation,
  useGetTasksFromBoardQuery,
} from '../../services/boardsApi';
import { useSelector } from 'react-redux';
import { columnsFromBoardSelector, tasksFromBoardSelector } from '../../store/selectors';
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

export const Column = (props: {
  boardId: string | undefined;
  column: { _id: string; title: string };
  index: number;
  tasks: { _id: string; description: string }[];
}) => {

  const tasks = useSelector(tasksFromBoardSelector);
  const { refetch } = useGetTasksFromBoardQuery(props.boardId);
  const [deleteColumn] = useDeleteColumnMutation();

  useEffect(() => {
    refetch();
  }, [tasks.length, refetch]);

  const onDeleteColumn = (columnId: string) => {
    deleteColumn({ boardId: props.boardId, columnId });
  };

  return (
    <Draggable draggableId={props.column._id} index={props.index}>
      {(provided) => (
        <div
          className={style.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className={style.title} {...provided.dragHandleProps}>
            {props.column.title}
          </div>
          <Droppable droppableId={props.column._id} type="task">
            {(provided) => (
              <div
                className={style.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {props.tasks.map(
                  (task: { _id: string; description: string }, index: any) => (
                    <Task key={task._id} task={task} index={index} />
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteColumn(props.column._id);
            }}
          >
            delete
          </button>
        </div>
      )}
    </Draggable>
  );
};
