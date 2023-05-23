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
    signIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.user = initialState.user;
      state.accessToken = initialState.accessToken;
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { signIn, signOut, setUser } = authSlice.actions;
export default authSlice.reducer;
