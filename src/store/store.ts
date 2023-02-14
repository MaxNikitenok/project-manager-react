import { boardsApi } from './../services/boardsApi';
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import userReducer from './userSlice';
import boardsReducer from './boardsSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    user: userReducer,
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(boardsApi.middleware),
});