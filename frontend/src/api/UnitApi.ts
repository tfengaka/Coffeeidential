import { Unit } from '~/types';
import axiosClient from './AxiosClient';

const UnitApi = {
  getUnitsByType: async (type: string): Promise<{ data: Unit[] }> =>
    await axiosClient.get('/units', { params: { type } }),
};

export default UnitApi;
