import React, { useEffect } from 'react';
import style from './Board.module.css';
import { Column } from './Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { useGetColumnsFromBoardQuery, useUpdateColumnsSetMutation, useUpdateTasksSetMutation } from '../../services/boardsApi';
import { useSelector } from 'react-redux';
import { columnOrderSelector, columnsFromBoardSelector, tasksFromBoardSelector } from '../../store/selectors';
import { setColumns, setNewColumnsOrder } from '../../store/boardsSlice';
import { useDispatch } from 'react-redux';

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
  const columns = useSelector(columnsFromBoardSelector);
  const tasks = useSelector(tasksFromBoardSelector);
  const dispatch = useDispatch();

const {data: columnsData} = useGetColumnsFromBoardQuery("63d4375f99bc1987263866e2");

const [updateColumns] = useUpdateColumnsSetMutation();
const [updateTasks] = useUpdateTasksSetMutation()

const handleUpdateColumns = async (orderList: { _id: string; order: number; }[]) => {
    await updateColumns(orderList);
    
};

const handleUpdateTasks = async (orderList: { _id: string; order: number; columnId: string}[]) => {
    await updateTasks(orderList);
}
 
  // const [state, setState] = useState(initialData);

  useEffect(() => {

  }, [columns, tasks]);

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

      const newOrderForColumns = Array.from(columns).map((column) => ({...column, order: newColumnOrder.indexOf(column._id)}))

      dispatch(setColumns(newOrderForColumns))
      dispatch(setNewColumnsOrder(newColumnOrder))
      
      const newOrderList = Array.from(columns).map((column) => ({_id: column._id, order: newColumnOrder.indexOf(column._id)}))
      
      handleUpdateColumns(newOrderList);
      return;
    }

    const home = columns.filter(
      (item) => item._id === source.droppableId
    )[0];

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

      const restColumns = columns.filter((item) => item._id !== source.droppableId)

      dispatch(setColumns([
        ...restColumns,
          newHome,
        ],))

      const newOrderForTasks = Array.from(tasks).filter((task) => home.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newTaskIds.indexOf(task._id), columnId: home._id}))
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
          .filter((item) => item._id !== newForeign._id)

   dispatch(setColumns([
        ...restColumns,
        newHome,
        newForeign,
      ]))

    const newOrderForHomeTasks = Array.from(tasks).filter((task) => newHome.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newHome.taskIds.indexOf(task._id), columnId: home._id}))
    const newOrderForForeignTasks = Array.from(tasks).filter((task) => newForeign.taskIds.includes(task._id)).map((task) => ({_id: task._id, order: newForeign.taskIds.indexOf(task._id), columnId: foreign._id}))
    
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
              {columnOrder.map((columnId, index) => {

                const column = columns.filter(
                  (item) => item._id === columnId
                )[0];

                return (
                  <InnerList
                    key={column._id}
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
    </div>
  );
};
