import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '.';
import { database } from '../example/operatorData';

interface InitialState {
  token: string;
  loggedin: boolean;
  loading: boolean;
}

type AppUser = PayloadAction<{ user: string; password: string }>;

const initialState: InitialState = {
  token: '',
  loggedin: false,
  loading: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequired: (state: InitialState, payload: AppUser) => {
      state.loading = !state.loading;
      const data = database;
      let test = false;
      data.map((d) => {
        if (d.user === payload.payload.user) {
          test = d.password === payload.payload.password;
        }
        return test;
      });
      if (test) toast.success('Login efetuado com sucesso!!');
      if (!test) toast.error('Usuário ou senha incorreta');
      state.loading = false;
    },
    loginSuccess: (state) => {
      console.log(state);
    },
  },
});

export const { loginRequired, loginSuccess } = authReducer.actions;

export const selectValue = (state: RootState) => state.auth;

export default authReducer.reducer;
