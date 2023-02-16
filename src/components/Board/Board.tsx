import React, { useState, useEffect } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { initialData } from './initialData';
import { useGetColumnsFromBoardQuery, useGetTasksFromBoardQuery, useUpdateColumnsSetMutation } from '../../services/boardsApi';
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
const [updateColumn] = useUpdateColumnsSetMutation();

const handleUpdateColumns = async (orderList: { _id: string; order: number; }[]) => {
  

  
  
  await updateColumn(orderList);
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
      console.log(newState);
      
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
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

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
