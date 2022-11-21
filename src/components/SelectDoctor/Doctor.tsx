import React, { useEffect, useState } from 'react';

import { DoctorStyled } from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncSpecialty } from '../../templates/PageSpecialty/specialtySlice';

interface Props {
  disabled?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classname: string;
}

export function Doctor(props: Props): JSX.Element {
  const database = useAppSelector((state) => state.specialty.data);
  const dispatch = useAppDispatch();
  const [data, setData] = useState([
    {
      id: 0,
      doctor: '',
      telephone: '',
      whatsapp: '',
      number: '',
      address: '',
      specialty: '',
      localPay: '',
      comments: '',
    },
  ]);
  useEffect(() => {
    dispatch(asyncSpecialty());
  }, []);
  useEffect(() => {
    setData(database);
  }, [database]);

  const { disabled, value, placeholder, onChange, classname } = props;

  return (
    <DoctorStyled
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={classname}
    >
      <option value=""> </option>
      {data.map((d) => {
        return (
          <option value={`${d.doctor}${d.id}`} key={d.id}>
            {d.doctor}
          </option>
        );
      })}
    </DoctorStyled>
  );
}
