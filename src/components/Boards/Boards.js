import React from 'react';
// import { useGetBoardsQuery } from '../../services/taskApi';
import style from './Boards.module.css';
import { Column } from './Column';
import initialData from './initialData';

const Boards = () => {
  // const { data = [] } = useGetBoardsQuery();

  return (
    <div className={style.boards}>
      {initialData.columnOrder.map((columnId) => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map(taskId => initialData.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </div>
  );
};

export default Boards;
