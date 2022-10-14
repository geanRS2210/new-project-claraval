import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../templates/PageLogin/authSlice';
import patient from '../templates/Schedule/patientSlice';
import operator from '../templates/PageOperator/operatorSlice';

const rootReducer = combineReducers({ auth, patient, operator });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
