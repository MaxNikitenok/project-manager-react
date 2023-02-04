import { UserState } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { appApi } from '../services/taskApi';

const initialState = {
  name: 'Max',
  login: 'Max',
  token: null,
} as UserState;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, { payload }) => {
			state.token = payload;
		},
	},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signUp.matchFulfilled,
      (state, {payload}) => {
        state.name = payload.name
        state.login = payload.login
      }
    );
    builder.addMatcher(
      appApi.endpoints.signIn.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.token
      }
    );
  }
});

export default userSlice.reducer;
export const { setToken } = userSlice.actions;
