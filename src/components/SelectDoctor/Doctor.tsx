import React, { useEffect, useState } from 'react';

import { DoctorStyled } from './styles';
import { database } from '../../example/specialtyData';

interface Props {
  disabled?: boolean;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classname: string;
}

export function Doctor(props: Props): JSX.Element {
  const [data, setData] = useState([
    {
      id: 0,
      name: '',
      telephone: '',
      whatsapp: '',
      address: '',
      specialty: '',
      localPay: false,
    },
  ]);

  useEffect(() => {
    setData(database);
  }, [data]);

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
          <option value={d.name} key={d.id}>
            {d.name}
          </option>
        );
      })}
    </DoctorStyled>
  );
}
