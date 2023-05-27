import { Unit } from '~/types';
import axiosClient from './AxiosClient';

const ProductApi = {
  getProductTypes: (): Promise<{ data: Unit[] }> => axiosClient.get('/product/types'),
};

export default ProductApi;
