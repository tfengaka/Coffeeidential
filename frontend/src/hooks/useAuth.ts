import { useLazyQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import router from '~/constants/routers';
import { SIGN_IN, SIGN_UP } from '~/graphql/mutations';
import { GET_USER_BY_ID } from '~/graphql/queries';
import { useAppDispatch } from '~/redux';
import { setUser, signIn, signOut } from '~/redux/reducers/authSlice';
import { AuthResponse, AuthUser, SignInForm, SignUpInput } from '~/types';
import { getUserIDFromToken } from '~/utils';

export default function useAuth() {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [signInMutate] = useMutation<{ authToken: AuthResponse }>(SIGN_IN);
  const [signUpMutate] = useMutation<{ authToken: AuthResponse }>(SIGN_UP);
  const [getUserData] = useLazyQuery<{ user: AuthUser }>(GET_USER_BY_ID);

  function getUserDataFromToken(token: string, callback: () => void) {
    getUserData({
      variables: { id: getUserIDFromToken(token) },
      onCompleted: ({ user }) => {
        dispath(setUser({ user }));
        callback();
      },
      onError: (error) => {
        toast.error(error.message);
        setIsError(true);
        console.error(error);
      },
    });
  }

  function handleSignIn(form: SignInForm, callback: () => void) {
    signInMutate({
      variables: { form },
      onCompleted: ({ authToken }) => {
        localStorage.setItem('refresh_token', authToken.refreshToken);
        dispath(signIn({ accessToken: authToken.token }));
        getUserDataFromToken(authToken.token, () => {
          callback();
        });
      },
      onError: (error) => {
        toast.error(error.message);
        setIsError(true);
        console.error(error);
      },
    });
  }

  function handleSignUp(form: SignUpInput, callback: () => void) {
    signUpMutate({
      variables: { form },
      onCompleted: ({ authToken }) => {
        localStorage.setItem('refresh_token', authToken.refreshToken);
        dispath(signIn({ accessToken: authToken.token }));
        getUserDataFromToken(authToken.token, () => {
          callback();
        });
      },
      onError: (error) => {
        toast.error(error.message);
        setIsError(true);
        console.error(error);
      },
    });
  }

  function hangleSignOut() {
    dispath(signOut());
    localStorage.removeItem('refresh_token');
    navigate(router.auth.signIn);
  }

  function handleUpdateInfo() {
    console.log('Update Account Info');
  }

  return {
    isError,
    handleSignIn,
    handleSignUp,
    hangleSignOut,
    handleUpdateInfo,
    getUserDataFromToken,
  };
}
