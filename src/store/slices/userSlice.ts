import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../models/responseTypes/auth';
import { LoginPayloadType, RefreshPayloadType } from '../../models/requestTypes/auth';
import { authService } from '../../services/authService';
import { localStorageApi } from '../../utils/localStorageApi';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../utils/constants';
import { RootStateType } from '../index';
import { setInitializedStatus } from './appSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';

type UserStateType = {
  permissions: string[];
  role: string | null;
  userId: number | null;
};

type ErrorType = string;

const initialState: UserStateType = {
  permissions: [],
  role: null,
  userId: null,
};

export const login = createAsyncThunk<UserType, LoginPayloadType>('user/login', async (loginData) => {
  const response = await authService.login(loginData);
  localStorageApi.setValue(REFRESH_TOKEN_KEY, response.data.refreshToken);
  localStorageApi.setValue(ACCESS_TOKEN_KEY, response.data.token);
  return response.data;
});

export const checkAuth = createAsyncThunk<UserType | void, undefined, { rejectValue: ErrorType }>(
  'user/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const refreshToken = localStorageApi.getValue<string>(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        const response = await axios.put<RefreshPayloadType, AxiosResponse<UserType>>('/api/v1/tokens', {
          refreshToken,
        });
        localStorageApi.setValue(REFRESH_TOKEN_KEY, response.data.refreshToken);
        localStorageApi.setValue(ACCESS_TOKEN_KEY, response.data.token);
        return response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        localStorageApi.removeValue(REFRESH_TOKEN_KEY);
        localStorageApi.removeValue(ACCESS_TOKEN_KEY);
      }
      return rejectWithValue('');
    } finally {
      dispatch(setInitializedStatus(true));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<UserType | undefined>) => {
      if (action.payload) {
        state.userId = action.payload.userId;
        state.role = action.payload.role;
        state.permissions = action.payload.permissions;
      }
    },
  },
});

export const getUser = (state: RootStateType) => state.user;

export default userSlice.reducer;
