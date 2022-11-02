import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import { RootState } from '../../store';

interface State {
  token: string;
  loading: boolean;
  data: {
    id: number;
    name: string;
    birthDate: string;
    nameMom: string;
    cpf: string;
    state: string;
    telephone: string;
    address: string;
    doctor: string;
    rg: string;
    appointmeintDate: string;
    value: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
type Amount = {
  id?: number;
  name?: string;
  birthDate?: string;
  nameMom?: string;
  cpf?: string;
  state?: string;
  telephone?: string;
  address?: string;
  doctor?: string;
  rg?: string;
  appointmeintDate?: string;
  value?: string;
  createdAt?: string;
  updatedAt?: string;
  navigate: NavigateFunction;
};
const initialState: State = {
  token: '',
  loading: false,
  data: [
    {
      id: 0,
      name: '',
      birthDate: '',
      nameMom: '',
      cpf: '',
      state: '',
      telephone: '',
      address: '',
      doctor: '',
      rg: '',
      appointmeintDate: '',
      value: '',
      createdAt: '',
      updatedAt: '',
    },
  ],
};

export const asyncSchedulePatient = createAsyncThunk(
  'patient/fetchSchedule',
  async () => {
    // const response = database;
    // return response;
    const response = await axios.get('/patient', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });
    return response.data;
  },
);
export const asyncCreatePatient = createAsyncThunk(
  'patient/fetchCreatePatient',
  async (amount: Amount) => {
    const {
      name,
      birthDate,
      nameMom,
      cpf,
      address,
      state,
      telephone,
      doctor,
      rg,
      appointmeintDate,
      value,
      navigate,
    } = amount;
    const response = await axios.post(
      '/patient/',
      {
        birthDate,
        nameMom,
        cpf,
        address,
        state,
        telephone,
        doctor,
        rg,
        name,
        appointmeintDate,
        value,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      },
    );
    return { ...response.data, navigate };
  },
);
export const asyncUpdatePatient = createAsyncThunk(
  'patient/fetchUpdatePatient',
  async (amount: Amount) => {
    const {
      id,
      name,
      birthDate,
      nameMom,
      cpf,
      address,
      state,
      telephone,
      doctor,
      rg,
      appointmeintDate,
      value,
      navigate,
    } = amount;

    const response = await axios.put(`/patient/${id}`, {
      name,
      birthDate,
      nameMom,
      cpf,
      address,
      state,
      telephone,
      doctor,
      rg,
      appointmeintDate,
      value,
    });
    return { ...response.data, navigate };
  },
);
export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncSchedulePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncSchedulePatient.fulfilled, (state, payload) => {
        state.loading = false;
        state.data = payload.payload;
      })
      .addCase(asyncSchedulePatient.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, Entre em contato com o suporte!!',
        );
      })
      .addCase(asyncCreatePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncCreatePatient.fulfilled, (state, payload) => {
        const { id, navigate } = payload.payload;
        state.loading = false;
        navigate(`/agendar/${'edit'}/${id}`);
        toast.success('Paciente Cadastrado com sucesso');
      })
      .addCase(asyncCreatePatient.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, Entre em contato com o suporte!!',
        );
      })
      .addCase(asyncUpdatePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncUpdatePatient.fulfilled, (state, payload) => {
        const { id, navigate } = payload.payload;
        state.loading = false;
        navigate(`/agendar/${'info'}/${id}`);
        toast.success('Paciente editado com succeso');
      })
      .addCase(asyncUpdatePatient.rejected, (state) => {
        state.loading = false;
        toast.error(
          'Ocorreu um erro inesperado, Entre em contato com o suporte!!',
        );
      });
  },
});

export const selectValue = (state: RootState) => state.auth;

export default patientSlice.reducer;
