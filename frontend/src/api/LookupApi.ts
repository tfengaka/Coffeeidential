import { LookUpProductData } from '~/types';
import axiosClient from './AxiosClient';

const LookupApi = {
  lookupProductData: async (productId: string): Promise<LookUpProductData> => axiosClient.get(`/lookup/${productId}`),
};

export default LookupApi;
