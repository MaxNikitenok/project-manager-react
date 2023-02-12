import { BoardsState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { boardsApi } from '../services/boardsApi';

const initialState = {
  boards: [
    { _id: '111', title: 'board-1', owner: 'Max', users: ['Max', 'John'] },
    { _id: '222', title: 'board-2', owner: 'Max', users: ['Max', 'John'] },
  ],
  columns: [
    {
      _id: '11',
      title: 'column-1',
      order: 0,
      boardId: '111',
    },
    {
      _id: '22',
      title: 'column-2',
      order: 1,
      boardId: '111',
    },
    {
      _id: '33',
      title: 'column-3',
      order: 2,
      boardId: '111',
    },
  ],
  tasks: [
    {
      _id: '1',
      title: 'task-1',
      order: 0,
      boardId: '111',
      columnId: '22',
      description: 'string1',
      userId: 1,
      users: ['Max', 'Elvira'],
    },
    {
      _id: '2',
      title: 'task-2',
      order: 1,
      boardId: '111',
      columnId: '22',
      description: 'string2',
      userId: 1,
      users: ['Max', 'Elvira'],
    },
    {
      _id: '3',
      title: 'task-3',
      order: 2,
      boardId: '111',
      columnId: '22',
      description: 'string3',
      userId: 1,
      users: ['Max', 'Elvira'],
    },
    {
      _id: '4',
      title: 'task-4',
      order: 3,
      boardId: '111',
      columnId: '22',
      description: 'string4',
      userId: 1,
      users: ['Max', 'Elvira'],
    },
  ],
  newColumnOrder: null,
} as BoardsState;

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setNewColumnsOrder(state, {payload}) {
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
  },
});

export default boardsSlice.reducer;
export const {setNewColumnsOrder} = boardsSlice.actions;
