import { LookUpData, OverviewData, TopProduct } from '~/types';
import axiosClient from './AxiosClient';

const LookupApi = {
  lookupProductData: async (productId: string): Promise<LookUpData> => axiosClient.get(`/lookup/${productId}`),
  getStatisticData: async (): Promise<OverviewData> => axiosClient.get('/lookup/statistics', { params: { limit: 14 } }),
  getTopProducts: async (): Promise<{ top_products: TopProduct[] }> =>
    axiosClient.get('/lookup/products', { params: { limit: 3 } }),
};

export default LookupApi;
