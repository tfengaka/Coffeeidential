import { Unit } from '~/types';
import axiosClient from './AxiosClient';

const CoffeeTypesApi = {
  getCoffeeTypes: (): Promise<{ data: Unit[] }> => axiosClient.get('/types'),
};

export default CoffeeTypesApi;
