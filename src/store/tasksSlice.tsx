import { createSlice } from '@reduxjs/toolkit';
import { signUp } from '../services/api';
import { TasksState } from '../types/types';

const initialState: TasksState = {
  tasks: [
    { _id: 1, name: 'eat', isDone: true },
    { _id: 2, name: 'work', isDone: true },
    { _id: 3, name: 'sleep', isDone: false },
    { _id: 4, name: 'eat', isDone: false },
    { _id: 5, name: 'relax', isDone: null },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // toggleAddBoardModal(state, action) {
    //   state.openAddBoardModal = action.payload;
    // },
    // toggleAddColumnModal(state, action) {
    //   state.openAddColumnModal = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, payload) => {
      console.log(payload);
    });
    // builder.addCase(createBoard.fulfilled, (state, { payload }) => {
    //   state.userBoards.push(payload);
    //   state.isLoading = false;
    // });
  },
});

export default tasksSlice.reducer;
// export const {
//   toggleAddBoardModal,
//   toggleAddColumnModal,
// } = tasksSlice.actions;
