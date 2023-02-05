import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  State, BoardsResponse, UsersResponse } from '../types/types';

export const appApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-for-project-manager.up.railway.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as State).user.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
    getUsers: build.query<UsersResponse, void>({
      query: () => 'users/',
    }),
    getBoards: build.query<BoardsResponse, void>({
      query: () => 'boards/',
    }),
    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: build.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetBoardsQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserQuery,
} = appApi;

// const columnsUrl = '/columns/';
// const columnsSetUrl = 'columnsSet/';
// const tasksUrl = '/tasks/';
// const tasksSetUrl = 'tasksSet/';
