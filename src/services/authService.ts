import { axiosInstance } from './axios';
import { AxiosResponse } from 'axios';
import { UserType } from '../models/responseTypes/auth';
import { LoginPayloadType, RefreshPayloadType } from '../models/requestTypes/auth';

export const authService = {
  endpoint: '/tokens',
  async login(payload: LoginPayloadType): Promise<AxiosResponse<UserType>> {
    const response = await axiosInstance.post<LoginPayloadType, AxiosResponse<UserType>>(
      this.endpoint,
      JSON.stringify(payload),
    );

    return response;
  },
  async update(payload: RefreshPayloadType): Promise<AxiosResponse<UserType>> {
    const response = await axiosInstance.put<RefreshPayloadType, AxiosResponse<UserType>>(
      this.endpoint,
      JSON.stringify(payload),
    );
    return response;
  },
};
