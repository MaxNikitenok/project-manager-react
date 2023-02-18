import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllBoardsQuery } from '../../services/boardsApi';
import style from './Boards.module.css';

const Boards = () => {

  const navigate = useNavigate();
  const {data: boards} = useGetAllBoardsQuery();

  return (
    <div className={style.boards}>
      {boards?.map((board) => {
        return (
          <div className={style.boardItem} onClick={()=>{navigate(`/boards/${board._id}`)} }key={board._id}>
            <div>{board.title}</div>
          </div>
        )
      })}
    </div>
  );
};

export default Boards;
