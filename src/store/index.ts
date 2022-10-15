import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../templates/PageLogin/authSlice';
import patient from '../templates/PageSchedule/patientSlice';
import operator from '../templates/PageOperator/operatorSlice';
import specialty from '../templates/PageSpecialty/specialtySlice';

const rootReducer = combineReducers({ auth, patient, operator, specialty });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
