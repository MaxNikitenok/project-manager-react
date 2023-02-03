import { configureStore } from '@reduxjs/toolkit';
import { appApi } from '../services/taskApi';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(appApi.middleware)
});