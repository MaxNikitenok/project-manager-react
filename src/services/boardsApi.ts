import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BoardsResponse, ColumnsResponse, TasksResponse } from '../types/types';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-for-project-manager.up.railway.app/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllBoards: build.query<BoardsResponse, void>({
      query: () => 'boards/',
    }),
    getColumnsFromBoard: build.query<ColumnsResponse, string>({
      query: (boardId) => `boards/${boardId}/columns`,
    }),
    getTasksFromBoard: build.query<TasksResponse, string>({
      query: (boardId) => `tasksSet/${boardId}`,
    }),
    updateColumnsSet: build.mutation<ColumnsResponse, { _id: string; order: number }[]>({
      query: (body) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body,
      }),
    }),
    updateTasksSet: build.mutation<TasksResponse, { _id: string; order: number; columnId: string }[]>({
      query: (body) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetColumnsFromBoardQuery,
  useGetTasksFromBoardQuery,
  useUpdateColumnsSetMutation,
  useUpdateTasksSetMutation,
} = boardsApi;
