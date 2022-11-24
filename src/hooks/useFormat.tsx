import { useState } from 'react';

export const useFormat = (): [
  (
    type: 'telephone' | 'cpf' | 'date' | 'fixTel',
    e: React.ChangeEvent<HTMLInputElement>,
  ) => string,
] => {
  const [lengthDate, setLengthDate] = useState(0);
  const [lengthCpf, setlengthCpf] = useState(0);
  const [lengthTelephone, setlengthTelephone] = useState(0);
  let Date = '';
  let Cpf = '';
  let Telephone = '';

  const checkDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const notNumber = event.target.value.match(/\D+/g)?.join('') || '';
    const stringTest = event.target.value.match(/(\d+)/g);
    Date = stringTest?.join('').replace(notNumber, '') || '';
    if (Date === null || Date.length === lengthDate) {
      const init = Date.slice(0, 2);
      const sequential = Date.slice(2, 4);
      const final = Date.slice(4, 8);
      event.target.value = `${init || ''}${
        sequential === '' ? '' : `/${sequential}`
      }${final === '' ? '' : `/${final}`}`;
    }
    if (Date.length > lengthDate) {
      if (Date.length === 2) {
        event.target.value = `${Date}/`;
      } else if (Date.length === 4) {
        const init = Date.slice(0, 2);
        const sequential = Date.slice(2, 4);
        event.target.value = `${init}/${sequential}/`;
      } else if (Date.length === 8) {
        const init = Date.slice(0, 2);
        const sequential = Date.slice(2, 4);
        const final = Date.slice(4, 8);
        event.target.value = `${init}/${sequential}/${final}`;
      } else if (
        (Date.length > 2 && Date.length > 4) ||
        (Date.length > 4 && Date.length > 8)
      ) {
        const init = Date.slice(0, 2);
        const sequential = Date.slice(2, 4);
        const final = Date.slice(4, 8);
        event.target.value = `${init || ''}${`/${sequential}` || ''}${
          `/${final}` || ''
        }`;
      }
    }
    setLengthDate(Date.length);
  };
  const checkCpf = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const notNumber = event.target.value.match(/\D+/g)?.join('') || '';
    const stringTest = event.target.value.match(/(\d+)/g);
    Cpf = stringTest?.join('').replace(notNumber, '') || '';
    if (Cpf === null || Cpf.length === lengthCpf) {
      const init = Cpf.slice(0, 3);
      const sequential = Cpf.slice(3, 6);
      const intermediario = Cpf.slice(6, 9);
      const final = Cpf.slice(9, 11);
      event.target.value = `${init || ''}${
        sequential === '' ? '' : `.${sequential}`
      }${intermediario === '' ? '' : `.${intermediario}`}${
        final === '' ? '' : `-${final}`
      }`;
    }
    if (Cpf.length > lengthCpf) {
      if (Cpf.length === 3) {
        event.target.value = `${Cpf}.`;
      } else if (Cpf.length === 6) {
        const init = Cpf.slice(0, 3);
        const sequential = Cpf.slice(3, 6);
        event.target.value = `${init}.${sequential}.`;
      } else if (Cpf.length === 9) {
        const init = Cpf.slice(0, 3);
        const sequential = Cpf.slice(3, 6);
        const intermediario = Cpf.slice(6, 9);
        event.target.value = `${init}.${sequential}.${intermediario}-`;
      } else if (
        (Cpf.length > 3 && Cpf.length < 6) ||
        (Cpf.length > 6 && Cpf.length < 9) ||
        (Cpf.length > 9 && Cpf.length > 11) ||
        Cpf.length === 11
      ) {
        const init = Cpf.slice(0, 3);
        const sequential = Cpf.slice(3, 6);
        const intermediario = Cpf.slice(6, 9);
        const final = Cpf.slice(9, 11);
        event.target.value = `${init || ''}${
          sequential === '' ? '' : `.${sequential}`
        }${intermediario === '' ? '' : `.${intermediario}`}${
          final === '' ? '' : `-${final}`
        }`;
      }
    }
    setlengthCpf(Cpf.length);
  };
  const checkTelephone = (
    event: React.ChangeEvent<HTMLInputElement>,
    num1: number,
    num2: number,
  ): void => {
    const notNumber = event.target.value.match(/\D+/g)?.join('') || '';
    const stringTest = event.target.value.match(/(\d+)/g);
    Telephone = stringTest?.join('').replace(notNumber, '') || '';
    if (
      (Telephone === null || Telephone.length === lengthTelephone) &&
      Telephone.length !== 2
    ) {
      const init = Telephone.slice(0, 2);
      const sequential = Telephone.slice(2, num1);
      const final = Telephone.slice(num1, num2);
      event.target.value = `${init === '' ? '' : `(${init})`}${
        sequential === '' ? '' : ` ${sequential}`
      }${final === '' ? '' : `-${final}`}`;
    }
    if (Telephone.length > lengthTelephone) {
      if (Telephone.length === 2) {
        event.target.value = `(${Telephone})`;
      } else if (Telephone.length === num1) {
        const init = Telephone.slice(0, 2);
        const sequential = Telephone.slice(2, num1);
        event.target.value = `(${init}) ${sequential}-`;
      } else if (Telephone.length === num2) {
        const init = Telephone.slice(0, 2);
        const sequential = Telephone.slice(2, num1);
        const intermediario = Telephone.slice(num1, num2);
        event.target.value = `(${init}) ${sequential}-${intermediario}`;
      } else if (
        (Telephone.length > 0 && Telephone.length < 2) ||
        (Telephone.length > 2 && Telephone.length < num1) ||
        (Telephone.length > num1 && Telephone.length < num2) ||
        Telephone.length > num2
      ) {
        const init = Telephone.slice(0, 2);
        const sequential = Telephone.slice(2, num1);
        const final = Telephone.slice(num1, num2);
        event.target.value = `${init === '' ? '' : `(${init}) `}${
          sequential === '' ? '' : `${sequential}`
        }${final === '' ? '' : `-${final}`}`;
      }
    }
    setlengthTelephone(Telephone.length);
  };
  const callbackFunction = (
    type: 'telephone' | 'cpf' | 'date' | 'fixTel',
    e: React.ChangeEvent<HTMLInputElement>,
  ): string => {
    if (type === 'date') {
      checkDate(e);
    } else if (type === 'telephone') {
      checkTelephone(e, 7, 11);
    } else if (type === 'cpf') {
      checkCpf(e);
    } else if (type === 'fixTel') {
      checkTelephone(e, 6, 10);
    }
    return e.target.value;
  };
  return [callbackFunction];
};
