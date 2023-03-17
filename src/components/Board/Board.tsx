import React, { useEffect, useState } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  useCreateColumnMutation,
  useGetColumnsFromBoardQuery,
  useUpdateColumnsSetMutation,
  useUpdateTasksSetMutation,
} from '../../services/boardsApi';
import { useSelector } from 'react-redux';
import {
  columnOrderSelector,
  columnsFromBoardSelector,
  isAuthorizedSelector,
  tasksFromBoardSelector,
} from '../../store/selectors';
import { setColumns, setNewColumnsOrder } from '../../store/boardsSlice';
import { resetUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { RxPlus } from 'react-icons/rx';

export const Board = () => {
  const { boardId } = useParams();
  const userId = localStorage.getItem('userId');

  const columnOrder = useSelector(columnOrderSelector);
  const columns = useSelector(columnsFromBoardSelector);
  const tasks = useSelector(tasksFromBoardSelector);
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useGetColumnsFromBoardQuery(boardId);
  // const { isLoading: isTaskLoading, isSuccess: isTaskSuccess } =
  //   useGetTasksFromBoardQuery(boardId);
  const [createColumn] = useCreateColumnMutation();

  const [updateColumns] = useUpdateColumnsSetMutation();
  const [updateTasks] = useUpdateTasksSetMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const navigate = useNavigate();
  const authorized = useSelector(isAuthorizedSelector);

  const openModal = () => {
    setIsOpen(true);
  };

  const onAddColumn = () => {
    if (newColumnTitle && userId) {
      //добавить приглашенных юзеров
      createColumn({
        title: newColumnTitle,
        order: columns.length,
        boardId: boardId,
      });
      setIsOpen(false);
      setNewColumnTitle('');
      // refetch();
    } else if (!newColumnTitle) {
      alert('Please enter the name of the column');
    } else if (!userId) {
      alert('что-то сломалось, ид юзера не обнаружен');
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnTitle(e.target.value);
  };

  const handleUpdateColumns = async (
    orderList: { _id: string; order: number }[]
  ) => {
    await updateColumns(orderList);
  };

  const handleUpdateTasks = async (
    orderList: { _id: string; order: number; columnId: string }[]
  ) => {
    await updateTasks(orderList);
  };

  // useEffect(() => {
  //   refetch();
  //   // return () => {
  //   //   dispatch(setColumns([]));
  //   //   dispatch(setTasks([]));
  //   //   dispatch(setNewColumnsOrder([]));
  //   // }
  // }, [refetch, columns.length]);

  useEffect(() => {
    if (authorized === false) {
      dispatch(resetUser());
      navigate(`/signIn`);
      console.log(11111111);
    }
  }, [authorized, dispatch, navigate]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newOrderForColumns = Array.from(columns).map((column) => ({
        ...column,
        order: newColumnOrder.indexOf(column._id),
      }));

      dispatch(setColumns(newOrderForColumns));
      dispatch(setNewColumnsOrder(newColumnOrder));

      const newOrderList = Array.from(columns).map((column) => ({
        _id: column._id,
        order: newColumnOrder.indexOf(column._id),
      }));

      handleUpdateColumns(newOrderList);
      return;
    }

    const home = columns.filter((item) => item._id === source.droppableId)[0];

    const foreign = columns.filter(
      (item) => item._id === destination.droppableId
    )[0];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const restColumns = columns.filter(
        (item) => item._id !== source.droppableId
      );

      dispatch(setColumns([...restColumns, newHome]));

      const newOrderForTasks = Array.from(tasks)
        .filter((task) => home.taskIds.includes(task._id))
        .map((task) => ({
          _id: task._id,
          order: newTaskIds.indexOf(task._id),
          columnId: home._id,
        }));
      handleUpdateTasks(newOrderForTasks);

      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const restColumns = columns
      .filter((item) => item._id !== newHome._id)
      .filter((item) => item._id !== newForeign._id);

    dispatch(setColumns([...restColumns, newHome, newForeign]));

    const newOrderForHomeTasks = Array.from(tasks)
      .filter((task) => newHome.taskIds.includes(task._id))
      .map((task) => ({
        _id: task._id,
        order: newHome.taskIds.indexOf(task._id),
        columnId: home._id,
      }));
    const newOrderForForeignTasks = Array.from(tasks)
      .filter((task) => newForeign.taskIds.includes(task._id))
      .map((task) => ({
        _id: task._id,
        order: newForeign.taskIds.indexOf(task._id),
        columnId: foreign._id,
      }));

    handleUpdateTasks([...newOrderForHomeTasks, ...newOrderForForeignTasks]);
  };

  return (
    <>
      {(isLoading || isLoading) && <div>Loading...</div>}

      {isSuccess && (
        <div className={style.board}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="allColumns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className={style.columnContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columnOrder.map((columnId, index) => {
                    const column = columns.filter(
                      (item) => item._id === columnId
                    )[0];

                    return (
                      <InnerList
                        key={column._id}
                        boardId={boardId}
                        column={column}
                        taskMap={tasks}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <motion.div
            className={style.addColumn}
            onClick={openModal}
            initial={{ opacity: 0, scaleX: 0, x: -100 }}
            animate={{ opacity: 1, scaleX: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
            }}
          >
            <RxPlus /> Add column
          </motion.div>

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
                  <Dialog.Title>Adding new column</Dialog.Title>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => {
                        changeHandler(e);
                      }}
                    />
                    <button
                      onClick={() => onAddColumn()}
                      disabled={!newColumnTitle}
                    >
                      add column
                    </button>
                  </div>
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                </Dialog.Panel>
              </motion.div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};

const InnerList = (props: {
  boardId: string | undefined;
  column: any;
  taskMap: any;
  index: any;
}) => {
  const { boardId, column, taskMap, index } = props;
  const tasks = column.taskIds.map(
    (taskId: string) =>
      taskMap.filter((item: { _id: string }) => item._id === taskId)[0]
  );
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, y: -300 }}
      animate={{ opacity: 1, scaleY: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1,
      }}
    >
      <Column boardId={boardId} column={column} tasks={tasks} index={index} />
    </motion.div>
  );
};
