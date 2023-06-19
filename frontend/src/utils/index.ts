import jwtDecode from 'jwt-decode';
import { JWTDecoded } from '~/types';

export const downloadImage = (data: string, fileName: string) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = data;
  link.click();
};

export const getUserIDFromToken = (token: string) => {
  return jwtDecode<JWTDecoded>(token).id;
};

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result?.toString() || '');
    };
  });
};

export const onImagesChange = (
  targetValue: string[],
  index: number,
  url: string,
  callback: (value: string[]) => void
) => {
  const cloneImages = [...targetValue];
  cloneImages[index] = url;
  callback(cloneImages);
};
export const onImagesRemove = (targetValue: string[], index: number, callback: (value: string[]) => void) => {
  const cloneImages = [...targetValue];
  cloneImages[index] = '';
  callback(cloneImages);
};

export const formatCurrency = (value: number) => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return VND.format(value);
};
