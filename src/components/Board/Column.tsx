import React, { useEffect, useState } from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useCreateTaskMutation,
  useDeleteColumnMutation,
  useGetTasksFromBoardQuery,
} from '../../services/boardsApi';
import { useSelector } from 'react-redux';
import {
  tasksFromBoardSelector,
} from '../../store/selectors';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
// import { IColumn, ITask } from '../../types/types';

// const InnerList = (props) => {
//   shouldComponentUpdate(nextProps) {
//     if (nextProps.tasks === props.tasks) {
//       return false;
//     }
//     return true;
//   }

//     return props.tasks.map((task: {id: string; content: string}, index: number) => (
//       <Task key={task.id} task={task} index={index} />
//     ));

// }

export const Column = (props: {
  boardId: string | undefined;
  column: { _id: string; title: string };
  index: number;
  tasks: { _id: string; description: string }[];
}) => {
  const tasks = useSelector(tasksFromBoardSelector);
  const { refetch } = useGetTasksFromBoardQuery(props.boardId);
  const [deleteColumn] = useDeleteColumnMutation();
  const userId = localStorage.getItem('userId');
  const [createTask] = useCreateTaskMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onAddTask = () => {
    if (newTaskTitle && userId) {
      //добавить приглашенных юзеров
      createTask({
        _id: '',
        title: newTaskTitle,
        order: 100,
        boardId: props.boardId,
        columnId: props.column._id,
        description: 'description',
        userId: userId,
        users: [''],
      });
      setIsOpen(false);
      setNewTaskTitle('');
    } else if (!newTaskTitle) {
      alert('Please enter the name of the task');
    } else if (!userId) {
      alert('что-то сломалось, ид юзера не обнаружен');
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [tasks.length, refetch]);

  const onDeleteColumn = (columnId: string) => {
    deleteColumn({ boardId: props.boardId, columnId });
  };

  return (
    <>
      <Draggable draggableId={props.column._id} index={props.index}>
        {(provided) => (
          <div
            className={style.container}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={style.title} {...provided.dragHandleProps}>
              {props.column.title}
            </div>
            <Droppable droppableId={props.column._id} type="task">
              {(provided) => (
                <div
                  className={style.taskList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {props.tasks.map(
                    (
                      task: { _id: string; description: string },
                      index: any
                    ) => (
                      <Task key={task._id} boardId={props.boardId} columnId={props.column._id} task={task} index={index} />
                    )
                  )}
                  {provided.placeholder}
                  <button onClick={() => setIsOpen(true)}>add task</button>
                </div>
              )}
            </Droppable>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteColumn(props.column._id);
              }}
            >
              delete
            </button>
          </div>
        )}
      </Draggable>
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
                <input
                  type="text"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                />
                <button
                  onClick={() => onAddTask()}
                  disabled={!newTaskTitle}
                >
                  add task
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
