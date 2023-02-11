import React from 'react';
import { useGetAllBoardsQuery } from '../../services/boardsApi';
import { Board } from '../Board/Board';
import style from './Boards.module.css';

const Boards = () => {
  const { data = [] } = useGetAllBoardsQuery();

  return (
    <div className={style.boards}>
      <Board />
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
