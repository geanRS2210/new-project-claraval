import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../templates/PageLogin/authReducer';
import patient from '../templates/AddPatient/patientReducer';

const rootReducer = combineReducers({ auth, patient });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
