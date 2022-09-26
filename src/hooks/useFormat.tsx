import { useState } from 'react';

export function useFormat(
  type: 'telephone' | 'cpf' | 'date',
  e: React.ChangeEvent<HTMLInputElement>,
): string {
  console.log('entrei no format');
  const [lengthDate, setLengthDate] = useState(0);
  const [lengthCpf, setlengthCpf] = useState(0);
  const [value, setvalue] = useState('');

  const checkDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthDate) {
      if (event.target.value.length === 2) {
        setvalue(`${event.target.value}/`);
      } else if (event.target.value.length === 5) {
        setvalue(`${event.target.value}/`);
      }
    }
    console.log('entrei no if');
    setLengthDate(event.target.value.length);
  };
  const checkCpf = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthCpf) {
      if (event.target.value.length === 3) {
        setvalue(`${event.target.value}.`);
      } else if (event.target.value.length === 7) {
        setvalue(`${event.target.value}.`);
      } else if (event.target.value.length === 11) {
        setvalue(`${event.target.value}-`);
      }
    }
    setlengthCpf(event.target.value.length);
  };
  const checkTelephone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthCpf) {
      if (event.target.value.length === 3) {
        setvalue(`${event.target.value}.`);
      } else if (event.target.value.length === 7) {
        setvalue(`${event.target.value}.`);
      } else if (event.target.value.length === 11) {
        setvalue(`${event.target.value}-`);
      }
    }
    setlengthCpf(event.target.value.length);
  };

  if (type === 'date') {
    checkDate(e);
  } else if (type === 'telephone') {
    checkTelephone(e);
  } else if (type === 'cpf') {
    checkCpf(e);
  }
  return value;
}
