import { BoardsState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardsApi } from '../services/boardsApi';

const initialState = {
  boards: [],
  columns: [],
  tasks: [],
  newColumnOrder: [],
} as BoardsState;

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setNewColumnsOrder(state, { payload }) {
      state.newColumnOrder = payload;
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
        state.columns = payload;
      }
    );
    builder.addMatcher(
      boardsApi.endpoints.getTasksFromBoard.matchFulfilled,
      (state, { payload }) => {
        console.log('tasks', payload);

        state.tasks = payload;
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
export const { setNewColumnsOrder } = boardsSlice.actions;
