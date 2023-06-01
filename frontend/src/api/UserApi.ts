import { AuthUser } from '~/types';
import axiosClient from './AxiosClient';

interface IAccountInfo {
  full_name: string;
  description: string;
}

interface IBranding {
  avatar: string;
  banner: string;
}

interface IContactInfo {
  address: string;
  phone: string;
  website: string;
}

const UserApi = {
  updateAccountInfo: (data: IAccountInfo): Promise<{ user: AuthUser }> => axiosClient.put('/users/accounts', data),
  updateBranding: (data: IBranding): Promise<{ user: AuthUser }> => axiosClient.put('/users/branding', data),
  updateContactInfo: (data: IContactInfo): Promise<{ user: AuthUser }> => axiosClient.put('/users/contacts', data),
};

export default UserApi;
