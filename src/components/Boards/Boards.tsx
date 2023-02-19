import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllBoardsQuery } from '../../services/boardsApi';
import style from './Boards.module.css';

const Boards = () => {
  const navigate = useNavigate();
  const { data: boards } = useGetAllBoardsQuery();

  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={style.boards}>
      {boards?.map((board) => {
        return (
          <div
            className={style.boardItem}
            onClick={() => {
              navigate(`/boards/${board._id}`);
            }}
            key={board._id}
          >
            <div>{board.title}</div>
          </div>
        );
      })}
      <div className={style.addBoard} onClick={openModal}>
        +
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
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Dialog.Panel className={style.dialogPanel}>
              <Dialog.Title>Add new board</Dialog.Title>
              <Dialog.Description>
                This will permanently deactivate your account
              </Dialog.Description>

              <p>
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>

              <button onClick={() => setIsOpen(false)}>Deactivate</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
};

export default Boards;
