import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

interface InitialState {
  loading: boolean;
  data: {
    id: number;
    user: string;
    level: string;
    password_hash: string;
    state: string;
    updated_at: string;
    created_at: string;
  }[];
}
interface Amount {
  id?: number;
  user?: string;
  level?: string;
  password?: string;
  state?: string;
  navigate: NavigateFunction;
}
const initialState: InitialState = {
  loading: false,
  data: [
    {
      id: 0,
      user: '',
      level: '',
      password_hash: '',
      state: '',
      updated_at: '',
      created_at: '',
    },
  ],
};

export const asyncOperator = createAsyncThunk(
  'operator/fetchOperator',
  async () => {
    const response = await axios.get('/operator');
    return response.data;
  },
);
export const asyncUpdateOperator = createAsyncThunk(
  'operator/fetchUpdateOperator',
  async (amount: Amount) => {
    const { user, level, id, password, state, navigate } = amount;
    const response = await axios.put(`/operator/${id}`, {
      user,
      level,
      password: password || null,
      state,
    });
    return { ...response.data, navigate };
  },
);
export const asyncCreateOperator = createAsyncThunk(
  'operator/fetchCreateOperator',
  async (amount: Amount) => {
    const { user, level, password, state, navigate } = amount;
    const response = await axios.post('/operator', {
      user,
      password,
      level,
      state,
    });
    return { ...response.data, navigate };
  },
);

export const operatorSlice = createSlice({
  name: 'operator',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncOperator.fulfilled, (state, payload) => {
        state.loading = false;
        state.data = payload.payload;
      })
      .addCase(asyncOperator.rejected, (state) => {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
        state.loading = false;
      })
      .addCase(asyncCreateOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncCreateOperator.fulfilled, (state, payload) => {
        const { navigate } = payload.payload;
        state.loading = false;
        navigate(`/operadores/`);
        toast.success('Operador criado com sucesso');
      })
      .addCase(asyncCreateOperator.rejected, (state) => {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
        state.loading = false;
      })
      .addCase(asyncUpdateOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncUpdateOperator.fulfilled, (state, payload) => {
        const { navigate } = payload.payload;
        state.loading = false;
        navigate(`/operadores/`);
        toast.success('Operador editado com sucesso');
      })
      .addCase(asyncUpdateOperator.rejected, (state) => {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
        state.loading = false;
      });
  },
});

export default operatorSlice.reducer;
