import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { database } from '../../example/operatorData';

interface InitialState {
  loading: boolean;
  data: {
    id: number;
    user: string;
    level: string;
    password: string;
    state: string;
  }[];
}
interface Amount {
  id?: number;
  user?: string;
  level?: string;
  password?: string;
  state?: string;
}
const initialState: InitialState = {
  loading: false,
  data: [
    {
      id: 50,
      user: '',
      level: '',
      password: '',
      state: '',
    },
  ],
};

export const asyncOperator = createAsyncThunk(
  'operator/fetchOperator',
  async () => {
    const response = database;
    // const response = await axios.get('/operator');
    return response;
  },
);
export const asyncUpdateOperator = createAsyncThunk(
  'operator/fetchUpdateOperator',
  async (amount: Amount) => {
    const { user, level, id, password, state } = amount;
    const response = await axios.put(`/operator/${id}`, {
      user,
      level,
      password: password || null,
      state,
    });
    return response.data;
  },
);
export const asyncCreateOperator = createAsyncThunk(
  'operator/fetchCreateOperator',
  async (amount: Amount) => {
    const { user, level, password, state } = amount;
    const response = await axios.post('/operator', {
      user,
      password,
      level,
      state,
    });
    return response.data;
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
        state.loading = true;
      })
      .addCase(asyncCreateOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncCreateOperator.fulfilled, (state, payload) => {
        state.loading = false;
        state.data = payload.payload;
      })
      .addCase(asyncCreateOperator.rejected, (state) => {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
        state.loading = true;
      })
      .addCase(asyncUpdateOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncUpdateOperator.fulfilled, (state, payload) => {
        state.loading = false;
        state.data = payload.payload;
      })
      .addCase(asyncUpdateOperator.rejected, (state) => {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
        state.loading = true;
      });
  },
});

export default operatorSlice.reducer;
