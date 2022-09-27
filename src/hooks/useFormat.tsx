import { useEffect, useState } from 'react';

export const useFormat = (): [
  (
    type: 'telephone' | 'cpf' | 'date',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => string,
] => {
  const [lengthDate, setLengthDate] = useState(0);
  const [lengthCpf, setlengthCpf] = useState(0);
  const [lengthRTelephone, setlengthTelephone] = useState(0);

  const checkDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthDate) {
      if (event.target.value.length === 2) {
        event.target.value = `${event.target.value}/`;
      } else if (event.target.value.length === 5) {
        event.target.value = `${event.target.value}/`;
      } else if (event.target.value.length > 10) {
        const val = event.target.value;
        event.target.value = val.slice(0, 10);
      }
    }
    setLengthDate(event.target.value.length);
  };
  const checkCpf = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthCpf) {
      if (event.target.value.length === 3) {
        event.target.value = `${event.target.value}.`;
      } else if (event.target.value.length === 7) {
        event.target.value = `${event.target.value}.`;
      } else if (event.target.value.length === 11) {
        event.target.value = `${event.target.value}-`;
      } else if (event.target.value.length > 14) {
        const val = event.target.value;
        event.target.value = val.slice(0, 14);
      }
    }
    setlengthCpf(event.target.value.length);
  };
  const checkTelephone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthRTelephone) {
      if (event.target.value.length === 2) {
        event.target.value = `(${event.target.value})`;
      } else if (event.target.value.length === 9) {
        event.target.value = `${event.target.value}-`;
      } else if (event.target.value.length > 14) {
        const val = event.target.value;
        event.target.value = val.slice(0, 14);
      }
    }
    setlengthTelephone(event.target.value.length);
  };
  const callbackFunction = (
    type: 'telephone' | 'cpf' | 'date',
    e: React.ChangeEvent<HTMLInputElement>,
  ): string => {
    if (type === 'date') {
      checkDate(e);
    } else if (type === 'telephone') {
      checkTelephone(e);
    } else if (type === 'cpf') {
      checkCpf(e);
    }
    return e.target.value;
  };

  return [callbackFunction];
};
