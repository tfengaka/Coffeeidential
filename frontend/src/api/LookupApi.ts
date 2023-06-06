import { LookUpData, OverviewData } from '~/types';
import axiosClient from './AxiosClient';

const LookupApi = {
  lookupProductData: async (productId: string): Promise<LookUpData> => axiosClient.get(`/lookup/${productId}`),
  getStatisticData: async (): Promise<OverviewData> => axiosClient.get('/lookup/statistics', { params: { limit: 14 } }),
};

export default LookupApi;
