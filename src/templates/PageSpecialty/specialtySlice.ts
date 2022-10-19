import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { database } from '../../mocks/specialtyData';

interface InitialState {
  loading: boolean;
  data: {
    id: number;
    doctor: string;
    address: string;
    number: string;
    telephone: string;
    whatsapp: string;
    specialty: string;
    comment: string;
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
  data: [
    {
      id: 0,
      doctor: '',
      address: '',
      number: '',
      telephone: '',
      whatsapp: '',
      specialty: '',
      comment: '',
      localPay: '',
    },
  ],
};

export const asyncSpecialty = createAsyncThunk(
  'specialty/fetchSpecialty',
  async () => {
    const response = database;
    return response;

    //  const response = await axios.get('/specialty');
    //  return response.data;
  },
);

export const asyncCreateSpecialty = createAsyncThunk(
  'specialty/fetchCreateSpecialty',
  async (amount: Amount) => {
    const response = await axios.post('/specialty', { ...amount });
    return response.data;
  },
);

export const asyncUpdateSpecialty = createAsyncThunk(
  'specialty/fetchUpdateSpecialty',
  async (amount: Amount) => {
    const { id } = amount;
    const response = await axios.put(`/specialty/${id}`, { ...amount });
    return response.data;
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
      .addCase(asyncSpecialty.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, entre em contato com o suporte!!',
        );
      })
      .addCase(asyncCreateSpecialty.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncCreateSpecialty.fulfilled, (state, payload) => {
        const { id } = payload.payload;
        state.loading = false;
        redirect(`/especialistas/add/${'edit'}/${id}`);
        toast.success('Médico Cadastrado com sucesso');
      })
      .addCase(asyncCreateSpecialty.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, entre em contato com o suporte!!',
        );
      })
      .addCase(asyncUpdateSpecialty.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncUpdateSpecialty.fulfilled, (state, payload) => {
        state.loading = false;
        const { id, navigate } = payload.payload;
        navigate(`/especialistas/add/${'info'}/${id}`);
        toast.success('Médico editado com sucesso');
      })
      .addCase(asyncUpdateSpecialty.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, entre em contato com o suporte!!',
        );
      });
  },
});

export default specialtySlice.reducer;
