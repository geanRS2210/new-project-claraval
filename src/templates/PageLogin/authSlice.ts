import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    const { user, password } = amount;
    const response = await axios.post('login', { user, password });
    return response.data;
  },
);

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncAuth.fulfilled, (state, payload) => {
        state.loggedin = true;
        state.user = payload.payload.user;
        state.level = payload.payload.level;
        axios.defaults.headers.authorization = payload.payload.token;
        state.loading = false;
        toast.success('Usuário logado com sucesso!!');
      })
      .addCase(asyncAuth.rejected, (state) => {
        state.loading = false;
        toast.error('Usuário ou senha incorreta');
      });
  },
});

export const selectValue = (state: RootState) => state.auth;

export default authReducer.reducer;
