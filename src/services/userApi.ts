import { IRegisterFormInput, IUser } from './../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UsersResponse } from '../types/types';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  endpoints: (build) => ({
    signUp: build.mutation<IUser, IRegisterFormInput>({
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
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserQuery,
} = userApi;

// const columnsUrl = '/columns/';
// const columnsSetUrl = 'columnsSet/';
// const tasksUrl = '/tasks/';
// const tasksSetUrl = 'tasksSet/';
