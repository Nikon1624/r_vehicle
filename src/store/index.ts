import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = typeof store;
export type AppDispatchType = AppStoreType['dispatch'];
