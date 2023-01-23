import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../types/types';

const initialState: AppState = {
  tasks: [
    {_id: 1, name: "eat", isDone: true},
    {_id: 2, name: "work", isDone: true},
    {_id: 3, name: "sleep", isDone: false},
    {_id: 4, name: "eat", isDone: false},
    {_id: 5, name: "relax", isDone: false}
  ]
};

const appSlice = createSlice({
  name: 'app',
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
    // builder.addCase(createBoard.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(createBoard.fulfilled, (state, { payload }) => {
    //   state.userBoards.push(payload);
    //   state.isLoading = false;
    // });
  },
});

export default appSlice.reducer;
export const {
  // toggleAddBoardModal,
  // toggleAddColumnModal,
} = appSlice.actions;