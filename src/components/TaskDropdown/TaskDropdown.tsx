import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RxDotsHorizontal } from 'react-icons/rx';
import style from './TaskDropdown.module.css';

export const TaskDropdown = (props: { onDeleteTask: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <>
      <Menu>
        <div className={style.menu}>
          <>
            <Menu.Button className={style.menuButton}>
              <RxDotsHorizontal aria-hidden="true" />
            </Menu.Button>
          </>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={style.menuItems}>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={ active ? style.activeItem : style.notActiveItem}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={ active ? style.activeItem : style.notActiveItem}
                      onClick={props.onDeleteTask}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </>
  );
};
