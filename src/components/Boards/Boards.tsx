import React from 'react';
import { useGetBoardsQuery } from '../../services/taskApi';
import style from './Boards.module.css';

const Boards = () => {
  const { data = [] } = useGetBoardsQuery();

  return (
    <div className={style.boards}>
      {data.map((board) => {
        return (
          <div className={style.boardItem} key={board._id}>
            <div>{board.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Boards;
