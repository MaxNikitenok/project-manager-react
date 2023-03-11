import React, { useState } from 'react';
import { Dialog, Menu } from '@headlessui/react';
import { Fragment } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import style from './TaskDropdown.module.css';
import { motion } from 'framer-motion';

export const TaskDropdown = (props: {
  onDeleteTask: React.MouseEventHandler<HTMLButtonElement>;
  onUpdateTask: (newTitle: string, newDescription: string) => void;
  taskTitle: string;
  taskDescription: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(props.taskTitle);
  const [newDescription, setNewDescription] = useState(props.taskDescription);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  };

  const updateTaskHandler = () => {
    props.onUpdateTask(newTitle, newDescription);
    setIsOpen(false);
  };

  return (
    <>
      <Menu>
        {({ open }) => (
          <>
            <div className={style.menu}>
              <Menu.Button className={style.menuButton}>
                <RxDotsHorizontal aria-hidden="true" />
              </Menu.Button>
              {open && (
                <Menu.Items
                  as={motion.div}
                  static
                  className={style.menuItems}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={
                            active ? style.activeItem : style.notActiveItem
                          }
                          onClick={() => setIsOpen(true)}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={
                            active ? style.activeItem : style.notActiveItem
                          }
                          onClick={props.onDeleteTask}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </div>
          </>
        )}
      </Menu>
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
              <Dialog.Title>Adding new task</Dialog.Title>
              <div>
                <div>
                  <div>Task name</div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => {
                      titleHandler(e);
                    }}
                  />
                </div>
                <div>
                  <div>Task description</div>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => {
                      descriptionHandler(e);
                    }}
                  />
                </div>

                <button onClick={updateTaskHandler}>update task</button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};
