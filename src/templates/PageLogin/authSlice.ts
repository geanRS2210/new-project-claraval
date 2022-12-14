import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { RootState } from '../../store';

interface InitialState {
  token: string;
  loggedin: boolean;
  loading: boolean;
  user: string;
  level: string;
}
interface Amount {
  user: string;
  password: string;
  navigate: NavigateFunction;
}

const initialState: InitialState = {
  token: '',
  loggedin: false,
  loading: false,
  user: '',
  level: '',
};

export const asyncAuth = createAsyncThunk(
  'auth/fetcAuth',
  async (amount: Amount) => {
    const { user, password, navigate } = amount;
    const response = await axios.post('/login', { user, password });
    return { ...response.data, navigate };
  },
);
export const asyncAuthStorage = createAsyncThunk(
  'auth/fetcAuthStorage',
  async () => {
    const log = localStorage.getItem('logged');
    const token = localStorage.getItem('authorization');
    const level = localStorage.getItem('level');
    return { log, token, level };
  },
);

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authReverse: (state) => {
      state.level = '';
      state.loggedin = false;
      state.user = '';
      state.level = '';
      localStorage.removeItem('authorization');
      localStorage.removeItem('level');
      localStorage.removeItem('logged');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncAuth.fulfilled, (state, payload) => {
        const { navigate } = payload.payload;
        if (payload.payload.errors) {
          state.loading = false;
          toast.error(payload.payload.errors);
        } else {
          state.loggedin = true;
          state.user = payload.payload.user;
          state.level = payload.payload.level;
          state.token = payload.payload.token;
          localStorage.setItem(
            'authorization',
            `bearer ${payload.payload.token}`,
          );
          localStorage.setItem('level', `${payload.payload.level}`);
          localStorage.setItem('logged', `true`);

          state.loading = false;
          navigate('/agenda');
          toast.success('Usu??rio logado com sucesso!!');
        }
      })
      .addCase(asyncAuth.rejected, (state) => {
        state.loading = false;
        toast.error('Usu??rio ou senha incorreta');
      })
      .addCase(asyncAuthStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncAuthStorage.fulfilled, (state, payload) => {
        if (payload.payload.log === 'true') {
          state.loggedin = true;
          state.level = payload.payload.level || '';
          state.token = payload.payload.token || '';
          state.loading = false;
        }
        state.loading = false;
      })
      .addCase(asyncAuthStorage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { authReverse } = authReducer.actions;

export const selectValue = (state: RootState) => state.auth;

export default authReducer.reducer;
