import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApi } from '~/api';

import router from '~/constants/routers';
import { useAppDispatch } from '~/redux';
import { signIn, signOut, setMe } from '~/redux/reducers/authSlice';
import { SignInForm, SignUpInput } from '~/types';

export default function useAuth() {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setIsError] = useState(false);

  async function handleGetMe(callback?: () => void) {
    setLoading(true);
    try {
      const res = await AuthApi.getMe();
      dispath(setMe({ user: res.user }));
      if (callback) callback();
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(form: SignInForm) {
    setLoading(true);
    try {
      const res = await AuthApi.signIn(form);
      dispath(signIn({ user: res.user, access_token: res.access_token }));
      navigate(router.dashboard.root);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error('Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(form: SignUpInput) {
    setLoading(true);
    try {
      const res = await AuthApi.signUp(form);
      toast.success(res.message);
      navigate(router.auth.signIn);
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error('Đăng ký thất bại!\nVui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  }

  function hangleSignOut() {
    dispath(signOut());
    navigate(router.auth.signIn);
  }

  function handleUpdateInfo() {
    console.log('Update Account Info');
  }

  return {
    loading,
    error,
    handleGetMe,
    handleSignIn,
    handleSignUp,
    hangleSignOut,
    handleUpdateInfo,
  };
}
