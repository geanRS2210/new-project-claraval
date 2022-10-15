import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { database } from '../../example/specialtyData';

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
    localPay: boolean;
  }[];
}

type Amount = {
  id?: number;
  doctor?: string;
  address?: string;
  number?: number;
  telephone?: string;
  whatsapp?: string;
  specialty?: string;
  localPay?: boolean;
  comment?: string;
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
      localPay: false,
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
      });
  },
});

export default specialtySlice.reducer;
