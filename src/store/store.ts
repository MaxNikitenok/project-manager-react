import { configureStore } from '@reduxjs/toolkit';
import { appApi } from '../services/taskApi';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(appApi.middleware),
});