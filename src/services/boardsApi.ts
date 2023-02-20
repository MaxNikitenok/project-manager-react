import { IColumn } from './../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BoardsResponse,
  ColumnsResponse,
  IBoard,
  TasksResponse,
} from '../types/types';

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
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getAllBoards: build.query<BoardsResponse, void>({
      query: () => 'boards',
    }),
    createBoard: build.mutation<
      IBoard,
      {
        title: string;
        owner: string;
        users: [string];
      }
    >({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        body,
      }),
    }),
    updateBoard: build.mutation<IBoard, IBoard>({
      query: (body) => ({
        url: `boards/${body._id}`,
        method: 'PUT',
        body: {
          title: body.title,
          owner: body.owner,
          users: body.users,
        },
      }),
    }),
    deleteBoard: build.mutation<IBoard, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
      }),
    }),

    getColumnsFromBoard: build.query<ColumnsResponse, string | undefined>({
      query: (boardId) => `boards/${boardId}/columns`,
    }),
    createColumn: build.mutation<
      IColumn,
      {
        title: string;
        order: number;
        boardId: string;
      }
    >({
      query: (body) => ({
        url: `boards/${body.boardId}/columns`,
        method: 'POST',
        body: {
          title: body.title,
          order: body.order,
        },
      }),
    }),
    getTasksFromBoard: build.query<TasksResponse, string | undefined>({
      query: (boardId) => `tasksSet/${boardId}`,
    }),
    getTasksFromColumn: build.query<
      TasksResponse,
      { boardId: string | undefined; columnId: string }
    >({
      query: ({ boardId, columnId }) =>
        `boards/${boardId}/columns/${columnId}/tasks`,
    }),
    updateColumnsSet: build.mutation<
      ColumnsResponse,
      { _id: string; order: number }[]
    >({
      query: (body) => ({
        url: `columnsSet`,
        method: 'PATCH',
        body,
      }),
    }),
    updateTasksSet: build.mutation<
      TasksResponse,
      { _id: string; order: number; columnId: string }[]
    >({
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
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetColumnsFromBoardQuery,
  useCreateColumnMutation,
  useGetTasksFromBoardQuery,
  useGetTasksFromColumnQuery,
  useUpdateColumnsSetMutation,
  useUpdateTasksSetMutation,
} = boardsApi;
