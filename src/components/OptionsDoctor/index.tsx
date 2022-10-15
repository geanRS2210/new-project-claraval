import React, { ReactNode } from 'react';

import { OptionsStyled } from './styles';
import { database } from '../../example/doctorData';

interface Props {
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Options(props: Props): JSX.Element {
  const { className, value, onChange } = props;
  return (
    <OptionsStyled className={className} value={value} onChange={onChange}>
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
