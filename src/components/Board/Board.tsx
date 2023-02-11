import React, { useState } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { columnsFromBoard, tasksFromBoard } from '../../store/selectors';
import { useUpdateColumnsSetMutation } from '../../services/boardsApi';

export const Board = () => {
  const columns = useSelector(columnsFromBoard);
  const tasks = useSelector(tasksFromBoard);

  const [state, setState] = useState({ columns, tasks });
  console.log(state);

  const onDragEnd = (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      console.log(result);
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
      console.log(newColumnOrder);
      
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, (state.columns.filter((column) => column._id === draggableId)[0]));
      const res = newColumnOrder.map((column, index) => {
        return {
          "_id": column._id,
          "order": index
        }
      });
      const res2 = newColumnOrder.map((column, index) => {
        return {
          "_id": column._id,
          "title": column.title,
          "order": index,
          "boardId": column.boardId
        }
      });

      const newState = {
        ...state,
        columns: res2,
      };
      setState(newState);
      return;


      // const newState = {
      //   ...state,
      //   columns: newColumnOrder,
      // };
      // setState(newState);
      // return;
      return res
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useUpdateColumnsSetMutation(res)
    
    const start = source.droppableId;
    const finish = destination.droppableId;
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
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
