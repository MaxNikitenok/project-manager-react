import React from 'react';
import { useSelector } from 'react-redux';
import { columnsFromBoardSelector } from '../../store/selectors';
import { Board } from '../Board/Board';
import style from './Boards.module.css';

const Boards = () => {
  const columns = useSelector(columnsFromBoardSelector);

  return (
    <div className={style.boards}>
      {true && <Board />}
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
