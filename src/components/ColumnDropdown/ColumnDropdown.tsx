import React, { useState } from 'react';
import style from './ColumnDropdown.module.css';
import { Dialog, Menu } from '@headlessui/react';
import { RxDotsHorizontal } from 'react-icons/rx';
import { motion } from 'framer-motion';

export const ColumnDropdown = (props: {
  onDeleteColumn: React.MouseEventHandler<HTMLButtonElement>;
  onUpdateColumn: (newTitle: string) => void;
  columnTitle: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(props.columnTitle);

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const updateColumnHandler = () => {
    props.onUpdateColumn(newTitle);
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
                          onClick={props.onDeleteColumn}
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
                <button onClick={updateColumnHandler}>update task</button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};
