import { Diary } from '~/types';
import axiosClient from './AxiosClient';

interface DiaryRequest {
  action: string;
  descriptions: string;
  images: string[];
}

const DiaryApi = {
  getDiariesByProductId: (productID: string): Promise<{ diaries: Diary[] }> =>
    axiosClient.get('/diaries', { params: { productID } }),
  createDiary: (productId: string, diary: DiaryRequest): Promise<Diary> =>
    axiosClient.post(`/diaries/${productId}`, diary),
};

export default DiaryApi;
