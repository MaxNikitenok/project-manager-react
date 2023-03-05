import React from 'react';
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import style from './TaskDropdown.module.css';
import { motion } from 'framer-motion';

export const TaskDropdown = (props: {
  onDeleteTask: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
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
  );
};
