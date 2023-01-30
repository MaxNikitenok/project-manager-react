import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import ky from 'ky';

export const basicUrl = 'https://backend-for-project-manager.up.railway.app//';

const signUpUrl = 'auth/signup';
const signInUrl = 'auth/signin';
// const usersUrl = 'users/';
// const boardsUrl = 'boards/';
// const columnsUrl = '/columns/';
// const columnsSetUrl = 'columnsSet/';
// const tasksUrl = '/tasks/';
// const tasksSetUrl = 'tasksSet/';

export const signUp = createAsyncThunk(
  'users/signUp',
  async (info: { name: string; login: string; password: string }) => {
    return axios
      .post(`${basicUrl}${signUpUrl}`, info)
      .then((res) => res.data)
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (info: { login: string; password: string }) => {
    return axios.post(`${basicUrl}${signInUrl}`, info).then((res) => res.data.token);
  }
);