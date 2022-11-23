import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';

interface InitialState {
  loading: boolean;
  deslog: boolean;
  data: {
    id: number;
    doctor: string;
    address: string;
    number: string;
    telephone: string;
    whatsapp: string;
    specialty: string;
    comments: string;
    localPay: string;
  }[];
}

type Amount = {
  id?: number;
  doctor?: string;
  address?: string;
  number?: string;
  telephone?: string;
  whatsapp?: string;
  specialty?: string;
  localPay?: string;
  comments?: string;
  navigate: NavigateFunction;
};

const initialState: InitialState = {
  loading: false,
  deslog: false,
  data: [
    {
      id: 0,
      doctor: '',
      address: '',
      number: '',
      telephone: '',
      whatsapp: '',
      specialty: '',
      comments: '',
      localPay: '',
    },
  ],
};

export const asyncSpecialty = createAsyncThunk(
  'specialty/fetchSpecialty',
  async () => {
    const token = localStorage.getItem('authorization');
    const response = await axios.get('/specialty', {
      headers: {
        authorization: `${token}`,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });
    return response.data;
  },
);

export const asyncCreateSpecialty = createAsyncThunk(
  'specialty/fetchCreateSpecialty',
  async (amount: Amount) => {
    const token = localStorage.getItem('authorization');
    const { navigate, ...td } = amount;
    const response = await axios.post(
      '/specialty',
      { ...td },
      {
        headers: {
          authorization: `${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      },
    );
    return { ...response.data, navigate };
  },
);

export const asyncUpdateSpecialty = createAsyncThunk(
  'specialty/fetchUpdateSpecialty',
  async (amount: Amount) => {
    const token = localStorage.getItem('authorization');
    const { id, navigate, ...td } = amount;
    const response = await axios.put(
      `/specialty/${id}`,
      { ...td },
      {
        headers: {
          authorization: `${token}`,
        },
      },
    );
    return { ...response.data, navigate };
  },
);
export const specialtySlice = createSlice({
  name: 'specialty',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncSpecialty.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncSpecialty.fulfilled, (state, payload) => {
        state.data = payload.payload;
        state.loading = false;
      })
      .addCase(asyncSpecialty.rejected, (state, payload) => {
        if (payload.error.message === 'Request failed with status code 401') {
          state.deslog = true;
          state.loading = false;
          toast.error('Faça login novamente, Tempo de sessão esgotado!!');
        } else {
          state.loading = false;
          toast.error(
            'Ocorreu um erro inesperado, entre em contato com o suporte!!',
          );
        }
      })
      .addCase(asyncCreateSpecialty.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncCreateSpecialty.fulfilled, (state, payload) => {
        const { navigate } = payload.payload;
        state.loading = false;
        navigate(`/especialistas`);
        toast.success('Médico Cadastrado com sucesso');
      })
      .addCase(asyncCreateSpecialty.rejected, (state, payload) => {
        if (payload.error.message === 'Request failed with status code 401') {
          state.deslog = true;
          state.loading = false;
          toast.error('Faça login novamente, Tempo de sessão esgotado!!');
        } else {
          state.loading = false;
          toast.error(
            'Ocorreu um erro inesperado, entre em contato com o suporte!!',
          );
        }
      })
      .addCase(asyncUpdateSpecialty.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncUpdateSpecialty.fulfilled, (state, payload) => {
        state.loading = false;
        const { navigate } = payload.payload;
        navigate(`/especialistas`);
        toast.success('Médico editado com sucesso');
      })
      .addCase(asyncUpdateSpecialty.rejected, (state, payload) => {
        if (payload.error.message === 'Request failed with status code 401') {
          state.loading = false;
          state.deslog = true;
          toast.error('Faça login novamente, Tempo de sessão esgotado!!');
        } else {
          state.loading = false;
          toast.error(
            'Ocorreu um erro inesperado, entre em contato com o suporte!!',
          );
        }
      });
  },
});

export default specialtySlice.reducer;
