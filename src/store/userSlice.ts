import { UserState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';

const initialState = {
  isAuthorized: !!localStorage.getItem('token'),
  isRegistrationSuccessfully: false,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, { payload }) => {
      localStorage.setItem('userLogin', payload);
    },
    resetUser: (state) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userLogin');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      state.isAuthorized = !!localStorage.getItem('token');
    },
    resetIsRegistrationSuccessfully: (state) => {
      state.isRegistrationSuccessfully = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.isRegistrationSuccessfully = true;
        alert(`Пользователь с именем ${payload.name} зарегистрирован.`)
      }
    );
    builder.addMatcher(
      userApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('token', payload.token);
        state.isAuthorized = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        const user = payload.filter(
          (user) => user.login === localStorage.getItem('userLogin')
        )[0];
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userLogin', user.login);
        localStorage.setItem('userName', user.name);
      }
    );
  },
});

export default userSlice.reducer;
export const { setUserLogin, resetUser, resetIsRegistrationSuccessfully } = userSlice.actions;
