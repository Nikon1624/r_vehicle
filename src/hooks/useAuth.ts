import { useAppSelector } from './redux';
import { getUser } from '../store/slices/userSlice';
import { localStorageApi } from '../utils/localStorageApi';
import { REFRESH_TOKEN_KEY } from '../utils/constants';

export const useAuth = () => {
  const user = useAppSelector(getUser);
  return { ...user, isAuth: !!localStorageApi.getValue<string>(REFRESH_TOKEN_KEY) };
};
