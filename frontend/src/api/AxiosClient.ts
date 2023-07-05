import axios, { AxiosError } from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: 'bracket' }),
});

axiosClient.interceptors.request.use(async (config) => {
  // handle token
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    console.log(error);
    throw error.response?.data.message || 'Something went wrong!';
  }
);

export default axiosClient;
