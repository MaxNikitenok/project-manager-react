import React, { useEffect, useState } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  columnsFromBoardSelector,
  newColumnOrderSelector,
  tasksFromBoardSelector,
} from '../../store/selectors';
import { useUpdateColumnsSetMutation } from '../../services/boardsApi';
import { useDispatch } from 'react-redux';
import { setNewColumnsOrder } from '../../store/boardsSlice';

export const Board = () => {
  const columns = useSelector(columnsFromBoardSelector);
  const tasks = useSelector(tasksFromBoardSelector);
  const newColumnOrder = useSelector(newColumnOrderSelector);
  const dispatch = useDispatch();

  const [updateColumns] = useUpdateColumnsSetMutation();

  const handleUpdateColumns = async () => {
    if (newColumnOrder) {
      await updateColumns(newColumnOrder).unwrap();
    }
  };

  const [state, setState] = useState({ columns, tasks });

  useUpdateColumnsSetMutation();

  useEffect(() => {
    return () => {};
  }, []);

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
      const newColumnOrder = Array.from(state.columns);

      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(
        destination.index,
        0,
        state.columns.filter((column) => column._id === draggableId)[0]
      );
      const res = newColumnOrder.map((column, index) => {
        return {
          _id: column._id,
          order: index,
        };
      });

      dispatch(setNewColumnsOrder(res));
      handleUpdateColumns();
      const res2 = newColumnOrder.map((column, index) => {
        return {
          _id: column._id,
          title: column.title,
          order: index,
          boardId: column.boardId,
        };
      });

      const newState = {
        ...state,
        columns: res2,
      };
      setState(newState);

      // const newState = {
      //   ...state,
      //   columns: newColumnOrder,
      // };
      // setState(newState);
      // return;
      return res;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    console.log(start);
    console.log(finish);

    if (start === finish) {
      const currentTasks = tasks.filter((task) => task.columnId === start);
      const newTasksOrder = Array.from(currentTasks);
      console.log(newTasksOrder);

      newTasksOrder.splice(source.index, 1);
      console.log(newTasksOrder);
      newTasksOrder.splice(
        destination.index,
        0,
        state.tasks.filter((task) => task._id === draggableId)[0]
      );
      console.log(newTasksOrder);

      const newOrderedColumn = newTasksOrder.map((task, index) => {
        return {
          _id: task._id,
          order: index,
        };
      });

      const res3 = newTasksOrder.map((task, index) => {
        return {
          _id: task._id,
          title: task.title,
          order: index,
          boardId: task.boardId,
          columnId: task.columnId,
          description: task.description,
          userId: task.userId,
          users: task.users,
        };
      });
      console.log(res3);
      

      const newState = {
        ...state,
        tasks: res3,
      };
      setState(newState);
        
      return;
    }
    const currentStartTasks = tasks.filter((task) => task.columnId === start);
    console.log('currentStartTasks', currentStartTasks);
    
    const startTaskIds = Array.from(currentStartTasks);
    console.log('startTaskIds', startTaskIds);
startTaskIds.splice(source.index, 1)
    const newStart = startTaskIds.map((task, index) => {
      return {
        _id: task._id,
        title: task.title,
        order: index,
        boardId: task.boardId,
        columnId: task.columnId,
        description: task.description,
        userId: task.userId,
        users: task.users,
      };
    });
    console.log(newStart);
    

    const currentFinishTasks = tasks.filter((task) => task.columnId === finish);
    const finishTaskIds = Array.from(currentFinishTasks);
    console.log('finishTaskIds', finishTaskIds);
    console.log('yyyy', state.tasks.filter((task) => task._id === draggableId)[0]);
    
   finishTaskIds.splice(destination.index, 0, state.tasks.filter((task) => task._id === draggableId)[0]) 

    const newFinish = finishTaskIds.map((task, index) => {
      return {
        _id: task._id,
        title: task.title,
        order: index,
        boardId: task.boardId,
        columnId: finish,
        description: task.description,
        userId: task.userId,
        users: task.users,
      };
    });

    console.log(newFinish);
    
    const newState = {
      ...state,
      tasks: [
        ...state.tasks.filter((task) => task.columnId !== start && task.columnId !== finish),
        ...newStart,
        ...newFinish,
      ]
    };
    console.log(newState);
    
    setState(newState);
  };

  return (
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
              {state.columns.map((item, index) => {
                const column = state.columns[item.order];
                const tasks = state.tasks.filter(
                  (task) => task.columnId === column._id
                );

                return (
                  <Column
                    key={column._id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
