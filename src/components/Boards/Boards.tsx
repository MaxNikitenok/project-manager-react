import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetAllBoardsQuery,
  useUpdateBoardMutation,
} from '../../services/boardsApi';
import { boardsSelector } from '../../store/selectors';
import { IBoard } from '../../types/types';
import { BoardDropdown } from '../BoardDropdown/BoardDropdown';
import style from './Boards.module.css';

const Boards = () => {
  const navigate = useNavigate();
  const { refetch } = useGetAllBoardsQuery();
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const boards = useSelector(boardsSelector);

  const [isOpen, setIsOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const userId = localStorage.getItem('userId');

  const openModal = () => {
    setIsOpen(true);
  };

  const onAddBoard = () => {
    if (newBoardTitle && userId) {
      //добавить приглашенных юзеров
      createBoard({ title: newBoardTitle, owner: userId, users: [''] });
      setIsOpen(false);
      setNewBoardTitle('');
    } else if (!newBoardTitle) {
      alert('Please enter the name of the board');
    } else if (!userId) {
      alert('что-то сломалось, ид юзера не обнаружен');
    }
  };

  const onUpdateBoard = (board: IBoard, newTitle: string) => {
    updateBoard({
      ...board,
      title: newTitle,
    });
  };

  const onDeleteBoard = (id: string) => {
    deleteBoard(id);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardTitle(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [boards.length, refetch]);

  return (
    <>
      <div className={style.boards}>
        {boards.map((board: IBoard) => {
          return (
            <div
              className={style.boardItem}
              onClick={() => {
                navigate(`/boards/${board._id}`);
              }}
              key={board._id}
            >
              <div className={style.boardHeader}>
                <span className={style.title}>{board.title}</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BoardDropdown
                    onDeleteBoard={onDeleteBoard}
                    onUpdateBoard={onUpdateBoard}
                    board={board}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <motion.div className={style.addBoard} onClick={openModal}
        initial={{ opacity: 0, scaleX: 0, x: -100}}
        animate={{ opacity: 1, scaleX: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        >
          <span>+ Add board</span>
        </motion.div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={style.dialog}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            delay: 0,
          }}
        >
          <div className={style.dialogBackground} aria-hidden="true" />
        </motion.div>
        <div className={style.panelWrapper}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Dialog.Panel className={style.dialogPanel}>
              <Dialog.Title>Adding new board</Dialog.Title>
              <div>
                <input
                  type="text"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                />
                <button onClick={() => onAddBoard()} disabled={!newBoardTitle}>
                  add board
                </button>
              </div>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};

export default Boards;
