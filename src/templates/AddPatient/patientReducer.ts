import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store';

interface State {
  token: string;
  loading: boolean;
}

type Payload = PayloadAction<string | number>;

const initialState: State = {
  token: '',
  loading: false,
};
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    patientSchedule: (state, payload: Payload) => {
      state.loading = true;
      toast.success('deu certo');
      console.log(state, payload);
      state.loading = false;
    },
    patientRemove: (state, payload: Payload) => {
      console.log('Agendamento cancelado com sucesso', state, payload);
    },
    patientEdit: (state) => {
      console.log('Agendamento editado com sucesso', state);
    },
  },
});

export const { patientSchedule, patientRemove, patientEdit } =
  patientSlice.actions;

export const selectValue = (state: RootState) => state.auth;

export default patientSlice.reducer;
