import { BoardsState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardsApi } from '../services/boardsApi';

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
    setColumns(state, { payload}) {
      state.columns = payload
    },
    setNewColumnsOrder(state, { payload }) {
      state.columnOrder = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      boardsApi.endpoints.getAllBoards.matchRejected,
      (state, { payload }) => {
        if (payload?.status === 403) {
          alert('token is dead');
          localStorage.removeItem('token');
        }
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getColumnsFromBoard.matchFulfilled,
      (state, { payload }) => {
        
        state.columns = payload.map((item) => ({...item, taskIds: []}))
        const order = Array.from(payload).sort((a, b) => a.order - b.order).map((column) => column._id)
        state.columnOrder = order;
        
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getTasksFromBoard.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload;
        state.columns.map((column) => {
          column.taskIds = state.tasks.filter((task) => task.columnId === column._id).map((task) => task._id)
        })
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.updateColumnsSet.matchFulfilled,
      (state, { payload }) => {
        console.log('tasks', payload);

        state.columns = payload;
      }
    );
  },
});

export default boardsSlice.reducer;
export const { setColumns, setNewColumnsOrder } = boardsSlice.actions;
