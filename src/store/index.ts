import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';

const rootReducer = combineReducers({ auth });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
