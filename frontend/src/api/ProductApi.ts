import { Product, Unit } from '~/types';
import axiosClient from './AxiosClient';

const ProductApi = {
  getProductTypes: (): Promise<{ data: Unit[] }> => axiosClient.get('/products/types'),
  getMyProducts: (): Promise<{ products: Product[] }> => axiosClient.get('/products'),
  createNewProduct: (product: Product): Promise<Product> => axiosClient.post('/products', product),
  updateProductStatus: (id: string, status: boolean): Promise<Product> =>
    axiosClient.put(`/products`, { id, is_production: status }),
};

export default ProductApi;
