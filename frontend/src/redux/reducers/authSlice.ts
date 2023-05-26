import { createSlice } from '@reduxjs/toolkit';
import { AuthUser } from '~/types';

type AuthState = {
  user?: AuthUser;
  accessToken?: string;
};

const initialState: AuthState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      localStorage.setItem('access_token', payload.access_token);
      state.user = payload.user;
    },
    setMe: (state, { payload }) => {
      state.user = payload.user;
    },
    signOut: (state) => {
      state.user = initialState.user;
      localStorage.removeItem('access_token');
    },
  },
});

export const { signIn, signOut, setMe } = authSlice.actions;
export default authSlice.reducer;
