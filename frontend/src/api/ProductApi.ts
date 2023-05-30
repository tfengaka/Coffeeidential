import { Product, Unit } from '~/types';
import axiosClient from './AxiosClient';

const ProductApi = {
  getProductTypes: (): Promise<{ data: Unit[] }> => axiosClient.get('/product/types'),
  getMyProducts: (): Promise<{ products: Product[] }> => axiosClient.get('/product'),
  createNewProduct: (product: Product): Promise<{ product: Product }> => axiosClient.post('/product', product),
  updateProductStatus: (id: string, status: boolean): Promise<Product> =>
    axiosClient.put(`/product`, { id, is_production: status }),
};

export default ProductApi;
