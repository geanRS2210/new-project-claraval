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
      try {
        console.log(state, payload);
        // const response = await axios.get('/patient', {payload})
        toast.success('deu certo');
      } catch (e) {
        toast.error('erro ao agendar paciente');
        console.log(e);
      }
      state.loading = false;
    },
    patientRemove: (state, payload: Payload) => {
      try {
        // const response = await axios.put('/patient/${id}', {status: 'overdue'})
        console.log('Agendamento cancelado com sucesso', state, payload);
      } catch (e) {
        toast.error('Erro ao excluir paciente');
      }
    },
    patientEdit: (state) => {
      try {
        // const response = await axios.put('/patient/${id}', {edições})
        console.log('Agendamento editado com sucesso', state);
      } catch (e) {
        toast.error('Erro ao editar paciente paciente');
      }
    },
  },
});

export const { patientSchedule, patientRemove, patientEdit } =
  patientSlice.actions;

export const selectValue = (state: RootState) => state.auth;

export default patientSlice.reducer;
