import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../index';

type AppStateType = {
  initializedStatus: boolean;
};

const initialState: AppStateType = {
  initializedStatus: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitializedStatus(state, action: PayloadAction<boolean>) {
      state.initializedStatus = action.payload;
    },
  },
});

export const { setInitializedStatus } = appSlice.actions;

export const getInitializedStatus = (state: RootStateType) => state.app.initializedStatus;

export default appSlice.reducer;
