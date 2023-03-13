import { BoardsState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardsApi } from '../services/boardsApi';
import { resetUser } from './userSlice';

const initialState = {
  boards: [],
  columns: [],
  tasks: [],
  columnOrder: [],
} as BoardsState;

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setColumns(state, { payload }) {
      state.columns = payload;
    },
    setTasks(state, { payload }) {
      state.tasks = payload;
    },
    setNewColumnsOrder(state, { payload }) {
      state.columnOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      boardsApi.endpoints.getAllBoards.matchFulfilled,
      (state, { payload }) => {
        state.boards = payload;
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getAllBoards.matchRejected,
      (state, { payload }) => {
        if (payload?.status === 403) {
          alert('token is dead');
          localStorage.removeItem('token');
          resetUser();
        }
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.createBoard.matchFulfilled,
      (state, { payload }) => {
        state.boards.push(payload);
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.deleteBoard.matchFulfilled,
      (state, { payload }) => {
        state.boards = state.boards.filter(
          (board) => board._id !== payload._id
        );
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getColumnsFromBoard.matchFulfilled,
      (state, { payload }) => {
        state.columns = payload.map((item) => ({ ...item, taskIds: [] }));
        state.columnOrder = Array.from(payload)
          .sort((a, b) => a.order - b.order)
          .map((column) => column._id);
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.createColumn.matchFulfilled,
      (state, { payload }) => {
        state.columns = [...state.columns, { ...payload, taskIds: [] }];
        state.columnOrder = [...state.columnOrder, payload._id]
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.updateColumn.matchFulfilled,
      (state, { payload }) => {
        const restColumns = state.columns.filter((column) => column._id !== payload._id);
        const currentColumn = state.columns.filter((column) => column._id === payload._id)[0];
        currentColumn.title = payload.title;
        state.columns = [...restColumns, currentColumn];
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.deleteColumn.matchFulfilled,
      (state, { payload }) => {
        state.columnOrder = state.columnOrder.filter(
          (item) => item !== payload._id
        );
        state.columns = state.columns.filter(
          (column) => column._id !== payload._id
        );
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getTasksFromBoard.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload;
        state.columns.map((column) => {
          return (column.taskIds = state.tasks
            .filter((task) => task.columnId === column._id)
            .sort((a, b) => a.order - b.order)
            .map((task) => task._id));
        });
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getTasksFromColumn.matchFulfilled,
      (state, { payload }) => {
        state.tasks = [...state.tasks, ...payload];
        state.columns.map((column) => {
          return (column.taskIds = state.tasks
            .filter((task) => task.columnId === column._id)
            .sort((a, b) => a.order - b.order)
            .map((task) => task._id));
        });
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.updateColumnsSet.matchFulfilled,
      (state, { payload }) => {
        state.columns = payload.map((item) => ({
          ...item,
          taskIds: state.columns.filter((column) => column._id === item._id)[0]
            .taskIds,
        }));
        const order = Array.from(payload)
          .sort((a, b) => a.order - b.order)
          .map((column) => column._id);
        state.columnOrder = order;
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.createTask.matchFulfilled,
      (state, { payload }) => {
        const currentColumn = state.columns.filter((column) => column._id === payload.columnId)[0];
        const restColumns = state.columns.filter((column) => column._id !== payload.columnId);      
        const newTaskIds = [...currentColumn.taskIds, payload._id];
        
        state.columns = [
          ...restColumns, {...currentColumn, taskIds: newTaskIds}
        ];
        state.tasks = [...state.tasks, payload];
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.updateTasksSet.matchFulfilled,
      (state, { payload }) => {
        const arrIds = payload.map((task) => task._id);
        state.tasks = [
          ...state.tasks.filter((task) => !arrIds.includes(task._id)),
          ...payload,
        ];

        state.columns.map((column) => {
          return (column.taskIds = state.tasks
            .filter((task) => task.columnId === column._id)
            .sort((a, b) => a.order - b.order)
            .map((task) => task._id));
        });
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.updateTask.matchFulfilled,
      (state, { payload }) => {
        const restTasks = state.tasks.filter((task) => task._id !== payload._id);
        state.tasks = [...restTasks, payload];
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.deleteTask.matchFulfilled,
      (state, { payload }) => {
        const currentColumn = state.columns.filter((column) => column._id === payload.columnId)[0];
        const restColumns = state.columns.filter((column) => column._id !== payload.columnId);      
        const newTaskIds = currentColumn.taskIds.filter((id) => id !== payload._id);
        
        state.columns = [
          ...restColumns, {...currentColumn, taskIds: newTaskIds}
        ];
        state.tasks = state.tasks.filter((task) => task._id !== payload._id);
      }
    );
  },
});

export default boardsSlice.reducer;
export const { setColumns, setTasks, setNewColumnsOrder } = boardsSlice.actions;
