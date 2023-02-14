import React from 'react';
import { Board } from '../Board/Board';
import style from './Boards.module.css';

const Boards = () => {

  return (
    <div className={style.boards}>
      <Board />
      {/* {data.map((board) => {
        return (
          <div className={style.boardItem} key={board._id}>
            <div>{board.title}</div>
            <div>{board._id}</div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Boards;
