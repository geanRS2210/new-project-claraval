import React from 'react';

import { OptionsStyled } from './styles';
import { database } from '../../mocks/doctorData';

interface Props {
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  initial: string;
}

export function Options(props: Props): JSX.Element {
  const { className, value, onChange, disabled, initial } = props;
  return (
    <OptionsStyled
      className={className}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value={initial}>{initial}</option>
      {database.map((d) => {
        return (
          <option value={d.value} key={d.value}>
            {d.text}
          </option>
        );
      })}
    </OptionsStyled>
  );
}
