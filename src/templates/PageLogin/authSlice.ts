import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { database } from '../../example/operatorData';

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
      try {
        state.loading = !state.loading;
        // const response = await axios.post('/login', {user: payload.user, password: payload.password})
        // toast.success('Usuário logado com sucesso');
        // axios.defaults.headers.authorization = `Bearer ${token}`;
        const data = database;
        let test = false;
        data.map((d) => {
          if (d.user === payload.payload.user) {
            test = d.password === payload.payload.password;
          }
          return test;
        });
        if (test) {
          toast.success('Usuário logado com sucesso');
        }
        if (!test) toast.error('Usuário ou senha incorreta');
        state.loading = !state.loading;
      } catch (e) {
        toast.error('Usuário ou senha incorreta');
        state.loading = !state.loading;
      }
    },
  },
});

export const { loginRequired } = authReducer.actions;

export const selectValue = (state: RootState) => state.auth;

export default authReducer.reducer;
