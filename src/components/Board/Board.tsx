import React, { useState, useEffect } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { initialData } from './initialData';
import { useGetColumnsFromBoardQuery, useGetTasksFromBoardQuery, useUpdateColumnsSetMutation, useUpdateTasksSetMutation } from '../../services/boardsApi';
import { useSelector } from 'react-redux';
import { columnOrderSelector, columnsFromBoardSelector, tasksFromBoardSelector } from '../../store/selectors';

const InnerList = (props: { column: any; taskMap: any; index: any }) => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map(
    (taskId: string) =>
      taskMap.filter((item: { _id: string }) => item._id === taskId)[0]
  );
  return <Column column={column} tasks={tasks} index={index} />;
};

export const Board = () => {

  const columnOrder = useSelector(columnOrderSelector);
  const newColumns = useSelector(columnsFromBoardSelector);
  const newTasks = useSelector(tasksFromBoardSelector);

const {data: columnsData} = useGetColumnsFromBoardQuery("63d4375f99bc1987263866e2");
const {data: tasksData} = useGetTasksFromBoardQuery("63d4375f99bc1987263866e2");
const [updateColumns] = useUpdateColumnsSetMutation();
const [updateTasks] = useUpdateTasksSetMutation()

const handleUpdateColumns = async (orderList: { _id: string; order: number; }[]) => {
    await updateColumns(orderList);
};

const handleUpdateTasks = async (orderList: { _id: string; order: number; columnId: string}[]) => {
    await updateTasks(orderList);
}
 
  const [state, setState] = useState(initialData);

  useEffect(() => {
    setState({boards: [], columns: newColumns, tasks: newTasks, columnOrder: columnOrder})
    
  }, [newColumns, newTasks, columnOrder])

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
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newOrderForColumns = Array.from(state.columns).map((column) => ({...column, order: newColumnOrder.indexOf(column._id)}))

      const newState = {
        ...state,
        columns: newOrderForColumns,
        columnOrder: newColumnOrder,
      };
      
      setState(newState);
      const newOrderList = Array.from(newState.columns).map((column) => ({_id: column._id, order: column.order}))
      handleUpdateColumns(newOrderList);
      return;
    }

    const home = state.columns.filter(
      (item) => item._id === source.droppableId
    )[0];

    const foreign = state.columns.filter(
      (item) => item._id === destination.droppableId
    )[0];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      console.log(newTaskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      console.log(newTaskIds);
      

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: [
          ...state.columns.filter((item) => item._id !== source.droppableId),
          newHome,
        ],
      };

      setState(newState);
      
      const newOrderForTasks = Array.from(newState.tasks).filter((task) => home.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newTaskIds.indexOf(task._id), columnId: home._id}))
      handleUpdateTasks(newOrderForTasks);
      console.log(newOrderForTasks);
      
      
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

    const newState = {
      ...state,
      columns: [
        ...state.columns
          .filter((item) => item._id !== newHome._id)
          .filter((item) => item._id !== newForeign._id),
        newHome,
        newForeign,
      ],
    };
    setState(newState);
   

    const newOrderForHomeTasks = Array.from(newState.tasks).filter((task) => newHome.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newHome.taskIds.indexOf(task._id), columnId: home._id}))
    const newOrderForForeignTasks = Array.from(newState.tasks).filter((task) => newForeign.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newForeign.taskIds.indexOf(task._id), columnId: foreign._id}))
    
      handleUpdateTasks([...newOrderForHomeTasks, ...newOrderForForeignTasks]);
      
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
              {state.columnOrder.map((columnId, index) => {

                const column = state.columns.filter(
                  (item) => item._id === columnId
                )[0];

                return (
                  <InnerList
                    key={column._id}
                    column={column}
                    taskMap={state.tasks}
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
