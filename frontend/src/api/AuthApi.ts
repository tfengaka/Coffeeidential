import { SignInForm, SignUpForm, AuthUser } from '~/types';
import axiosClient from './AxiosClient';

interface AuthResponse {
  user: AuthUser;
  access_token: string;
}

const AuthApi = {
  signIn: (params: SignInForm): Promise<AuthResponse> => axiosClient.post('/sign-in', params),
  signUp: (params: SignUpForm): Promise<{ message: string }> => axiosClient.post('/sign-up', params),
  getMe: (): Promise<{ user: AuthUser }> => axiosClient.get('/me'),
};

export default AuthApi;
