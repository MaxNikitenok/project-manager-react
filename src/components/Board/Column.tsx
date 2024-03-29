import React, { useState } from 'react';
import style from './Column.module.css';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  useCreateTaskMutation,
  useDeleteColumnMutation,
  useGetTasksFromBoardQuery,
  useUpdateColumnMutation,
} from '../../services/boardsApi';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { IColumn, ITask } from '../../types/types';
import { RxPlus } from 'react-icons/rx';
import { ColumnDropdown } from '../ColumnDropdown/ColumnDropdown';
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
  column: IColumn;
  index: number;
  tasks: ITask[];
}) => {
  const { isSuccess } = useGetTasksFromBoardQuery(props.boardId);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const userId = localStorage.getItem('userId');
  const [createTask] = useCreateTaskMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(' ');
  const [newTaskDescription, setNewTaskDescription] = useState(' ');

  const onAddTask = () => {
    if (newTaskTitle && userId) {
      //добавить приглашенных юзеров

      createTask({
        _id: '',
        title: newTaskTitle,
        order: props.tasks.length,
        boardId: props.boardId,
        columnId: props.column._id,
        description: newTaskDescription,
        userId: userId,
        users: [''],
      });
      setIsOpen(false);
      setNewTaskTitle(' ');
      setNewTaskDescription(' ');
    } else if (!newTaskTitle) {
      alert('Please enter the name of the task');
    } else if (!userId) {
      alert('что-то сломалось, ид юзера не обнаружен');
    }
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(e.target.value);
  };

  // useEffect(() => {
  //   refetch();
  // }, [tasks.length, refetch]);

  const onUpdateColumn = (newTitle: string) => {
    updateColumn({
      ...props.column,
      title: newTitle,
    });
  };

  const onDeleteColumn = () => {
    deleteColumn({ boardId: props.boardId, columnId: props.column._id });
  };

  return (
    <>
      {isSuccess && (
        <Draggable draggableId={props.column._id} index={props.index}>
          {(provided) => (
            <div
              className={style.container}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className={style.columnHeader} {...provided.dragHandleProps}>
                <div>
                  <span className={style.title}>{props.column.title}</span>
                  <span className={style.tasksCounter}>
                    {props.tasks.length}
                  </span>
                </div>
                <ColumnDropdown
                  onDeleteColumn={onDeleteColumn}
                  onUpdateColumn={onUpdateColumn}
                  columnTitle={props.column.title}
                />
              </div>
              <Droppable droppableId={props.column._id} type="task">
                {(provided) => (
                  <div
                    className={style.taskList}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {props.tasks.map((task: ITask, index: any) => (
                      <div key={task._id}>
                        <Task
                          key={task._id}
                          boardId={props.boardId}
                          columnId={props.column._id}
                          task={task}
                          index={index}
                        />
                      </div>
                    ))}
                    {provided.placeholder}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 2,
                      }}
                    >
                      <button
                        className={style.addTaskButton}
                        onClick={() => setIsOpen(true)}
                      >
                        <RxPlus /> Add task
                      </button>
                    </motion.div>
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      )}

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
                    onChange={(e) => {
                      titleHandler(e);
                    }}
                  />
                </div>
                <div>
                  <div>Task description</div>
                  <input
                    type="text"
                    onChange={(e) => {
                      descriptionHandler(e);
                    }}
                  />
                </div>

                <button onClick={() => onAddTask()} disabled={!newTaskTitle}>
                  add task
                </button>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
              </div>
            </Dialog.Panel>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
};
