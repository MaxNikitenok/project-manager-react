import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllBoardsQuery } from '../../services/boardsApi';
import { Board } from '../Board/Board';
import style from './Boards.module.css';

const Boards = () => {

  const {data: boards} = useGetAllBoardsQuery();

  return (
    <div className={style.boards}>
      <Board />
    </div>
  );
};

export default Boards;
