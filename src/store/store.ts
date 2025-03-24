import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../domains/auth/store/authSlice';
import { taskReducer } from '../domains/task/store/taskSlice';

import { authMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 