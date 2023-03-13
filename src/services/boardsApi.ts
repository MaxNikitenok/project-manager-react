import { IColumn, ITask } from './../types/types';
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
    baseUrl: 'https://backend-for-project-manager-production.up.railway.app/',
    // baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  keepUnusedDataFor: 0,
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

    getColumnsFromBoard: build.query<ColumnsResponse, string| undefined>({
      query: (boardId) => `boards/${boardId}/columns`,
    }),
    createColumn: build.mutation<
      IColumn,
      {
        title: string;
        order: number;
        //Убрать undefined
        boardId: string | undefined;
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
    updateColumn: build.mutation<IColumn, IColumn>({
      query: (body) => ({
        url: `boards/${body.boardId}/columns/${body._id}`,
        method: 'PUT',
        body: {
          title: body.title,
          order: body.order,
        },
      }),
    }),
    //Убрать undefined
    deleteColumn: build.mutation<
      IBoard,
      { boardId: string | undefined; columnId: string }
    >({
      query: (body) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}`,
        method: 'DELETE',
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
    createTask: build.mutation<ITask, ITask>({
      query: (body) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'POST',
        body: {
          title: body.title,
          order: body.order,
          description: body.description,
          userId: body.userId,
          users: body.users,
        },
      }),
    }),
    updateTask: build.mutation<ITask, ITask>({
      query: (body) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body._id}`,
        method: 'PUT',
        body: {
          title: body.title,
          order: body.order,
          description: body.description,
          columnId: body.columnId,
          userId: body.userId,
          users: body.users,
        },
      }),
    }),
    deleteTask: build.mutation<
      ITask,
      { boardId: string | undefined; columnId: string; taskId: string }
    >({
      query: (body) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'DELETE',
      }),
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
  useUpdateColumnsSetMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,

  useGetTasksFromBoardQuery,
  useGetTasksFromColumnQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTasksSetMutation,
  useDeleteTaskMutation,
} = boardsApi;
