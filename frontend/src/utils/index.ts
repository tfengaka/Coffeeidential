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
