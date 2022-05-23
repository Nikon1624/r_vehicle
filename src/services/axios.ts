import axios, { AxiosResponse } from 'axios';
import { localStorageApi } from '../utils/localStorageApi';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/constants';
import { RefreshPayloadType } from '../models/requestTypes/auth';
import { UserType } from '../models/responseTypes/auth';

const API_URL = '/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorageApi.getValue<string>(ACCESS_TOKEN_KEY);

  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const initialRequest = error.config;
    const refreshToken = localStorageApi.getValue<string>(REFRESH_TOKEN_KEY);

    if (refreshToken && error.response.status === 401 && error.config && !error.config.retryRequest) {
      initialRequest.retryRequest = true;

      try {
        const response = await axios.put<RefreshPayloadType, AxiosResponse<UserType>>(
          '/api/v1/tokens',
          JSON.stringify({ refreshToken }),
        );

        localStorageApi.setValue(REFRESH_TOKEN_KEY, response.data.refreshToken);
        localStorageApi.setValue(ACCESS_TOKEN_KEY, response.data.token);

        return await axiosInstance.request(initialRequest);
      } catch (err) {
        localStorageApi.removeValue(REFRESH_TOKEN_KEY);
        localStorageApi.removeValue(ACCESS_TOKEN_KEY);
      }
    }

    throw error;
  },
);
