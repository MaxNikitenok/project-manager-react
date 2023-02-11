import { UserState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';

const initialState = {
  name: null,
  login: null,
  isAuthorized: !!localStorage.getItem('token'),
  isRegistrationSuccessfully: false,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.name = null;
      state.login = null;
      localStorage.removeItem('token');
      state.isAuthorized = !!localStorage.getItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.name = payload.name;
        state.login = payload.login;
        state.isRegistrationSuccessfully = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('token', payload.token);
        state.isAuthorized = true;
      }
    );
  },
});

export default userSlice.reducer;
export const { resetUser } = userSlice.actions;
