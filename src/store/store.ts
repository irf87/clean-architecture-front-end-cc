import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../domains/auth/store/authSlice';

import { authMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 