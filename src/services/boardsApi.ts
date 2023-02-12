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
    // signUp: build.mutation({
    //   query: (body) => ({
    //     url: 'auth/signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // signIn: build.mutation({
    //   query: (body) => ({
    //     url: 'auth/signin',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getUsers: build.query<UsersResponse, void>({
    //   query: () => 'users/',
    // }),
    getAllBoards: build.query<BoardsResponse, void>({
      query: () => 'boards/',
    }),
    getColumnsFromBoard: build.query<ColumnsResponse, void>({
      query: (boardId) => `boards/${boardId}/columns`,
    }),
    getTasksFromBoard: build.query<TasksResponse, void>({
      query: (boardId) => `tasksSet/${boardId}`,
    }),
    updateColumnsSet: build.mutation({
      query: (body: { _id: string; order: number }[]) => ({
        url: `columnsSet`,
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
} = boardsApi;

// const columnsUrl = '/columns/';
// const columnsSetUrl = 'columnsSet/';
// const tasksUrl = '/tasks/';
// const tasksSetUrl = 'tasksSet/';
