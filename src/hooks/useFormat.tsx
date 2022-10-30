import { useState } from 'react';

export const useFormat = (): [
  (
    type: 'telephone' | 'cpf' | 'date',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => string,
] => {
  const [lengthDate, setLengthDate] = useState(0);
  const [lengthCpf, setlengthCpf] = useState(0);
  const [lengthTelephone, setlengthTelephone] = useState(0);

  const checkDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthDate) {
      if (lengthDate === 2) {
        const ped = event.target.value.slice(2, 3);
        const ini = event.target.value.slice(0, 2);
        event.target.value = `${ini}/${ped}`;
      }
      if (lengthDate === 5) {
        const ped = event.target.value.slice(5, 6);
        const ini = event.target.value.slice(0, 5);
        event.target.value = `${ini}/${ped}`;
      }
      if (event.target.value.length === 2) {
        event.target.value = `${event.target.value}/`;
      } else if (event.target.value.length === 5) {
        event.target.value = `${event.target.value}/`;
      } else if (event.target.value.length > 10) {
        const val = event.target.value;
        event.target.value = val.slice(0, 10);
        const num = event.target.value.split('/').join('');
        const num3 = num.slice(0, 2);
        const num4 = num.slice(2, 4);
        const num5 = num.slice(4, 8);
        event.target.value = `${num3}/${num4}/${num5}`;
      }
    }
    setLengthDate(event.target.value.length);
  };
  const checkCpf = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthCpf) {
      if (lengthCpf === 3) {
        const ped = event.target.value.slice(3, 4);
        const ini = event.target.value.slice(0, 3);
        event.target.value = `${ini}.${ped}`;
      }
      if (lengthCpf === 7) {
        const ped = event.target.value.slice(7, 8);
        const ini = event.target.value.slice(0, 7);
        event.target.value = `${ini}.${ped}`;
      }
      if (lengthCpf === 11) {
        const ped = event.target.value.slice(11, 12);
        const ini = event.target.value.slice(0, 11);
        event.target.value = `${ini}-${ped}`;
      }
      if (event.target.value.length === 3) {
        event.target.value = `${event.target.value}.`;
      } else if (event.target.value.length === 7) {
        event.target.value = `${event.target.value}.`;
      } else if (event.target.value.length === 11) {
        event.target.value = `${event.target.value}-`;
      } else if (event.target.value.length > 14) {
        const val = event.target.value;
        event.target.value = val.slice(0, 14);
        const num = event.target.value.split('.').join('').split('-').join('');
        const num3 = num.slice(0, 3);
        const num4 = num.slice(3, 6);
        const num5 = num.slice(6, 9);
        const num6 = num.slice(9, 11);
        event.target.value = `${num3}.${num4}.${num5}-${num6}`;
      }
    }
    setlengthCpf(event.target.value.length);
  };
  const checkTelephone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > lengthTelephone) {
      if (lengthTelephone === 3) {
        const ped = event.target.value.slice(3, 4);
        const ini = event.target.value.slice(0, 3);
        event.target.value = `${ini})${ped}`;
      }
      if (lengthTelephone === 9) {
        const ped = event.target.value.slice(9, 10);
        const ini = event.target.value.slice(0, 9);
        event.target.value = `${ini}-${ped}`;
      }
      if (event.target.value.length === 2) {
        event.target.value = `(${event.target.value})`;
      } else if (event.target.value.length === 9) {
        event.target.value = `${event.target.value}-`;
      } else if (event.target.value.length > 14) {
        const val = event.target.value;
        event.target.value = val.slice(0, 14);
        const num = event.target.value
          .split('(')
          .join('')
          .split(')')
          .join('')
          .split('-')
          .join('');
        const num3 = num.slice(0, 2);
        const num4 = num.slice(2, 7);
        const num5 = num.slice(7, 11);
        event.target.value = `(${num3})${num4}-${num5}`;
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
