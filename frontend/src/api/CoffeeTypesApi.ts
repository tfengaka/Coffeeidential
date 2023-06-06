import { Unit } from '~/types';
import axiosClient from './AxiosClient';

const CoffeeTypesApi = {
  getCoffeeTypes: (): Promise<{ data: Unit[] }> => axiosClient.get('/types'),
  getCoffeeTypeById: (id: string): Promise<Unit> => axiosClient.get(`/types/${id}`),
};

export default CoffeeTypesApi;
