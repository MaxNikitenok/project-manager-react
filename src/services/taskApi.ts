import { UsersResponse } from './../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BoardsResponse } from '../types/types';

export const appApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-for-project-manager.up.railway.app/',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGFkNWI1MjE5YjNiNDAwOTVlY2Y3ZCIsImxvZ2luIjoiMTExIiwiaWF0IjoxNjc1NDQ5MDYyLCJleHAiOjE2NzU0OTIyNjJ9.92Vt7owWI5ZgmpJtAVCTUUual6GvDP5WpWaQxuasAdc`,
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
      query: ({id, body}) => ({
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

export const { useSignUpMutation, useSignInMutation, useGetBoardsQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserQuery } =
  appApi;

// const columnsUrl = '/columns/';
// const columnsSetUrl = 'columnsSet/';
// const tasksUrl = '/tasks/';
// const tasksSetUrl = 'tasksSet/';
