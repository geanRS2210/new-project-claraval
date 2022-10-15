import React, { useEffect, useState } from 'react';

import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncSpecialty } from './specialtySlice';
import { Options } from '../../components/OptionsDoctor';
import { List } from '../../components/List/List';

export default function Specialty(): JSX.Element {
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.specialty.data);
  const [select, setSelect] = useState('all');
  const [data, setData] = useState([
    {
      id: 0,
      doctor: '',
      address: '',
      number: '',
      telephone: '',
      whatsapp: '',
      specialty: '',
      comment: '',
      localPay: false,
    },
  ]);
  useEffect(() => {
    dispatch(asyncSpecialty());
    setData(database);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelect(event);
  };
  return (
    <Wrapper>
      <section>
        <Options
          className="type-schedule"
          value={select}
          onChange={handleChange}
        />
      </section>
      {data.map((d) => {
        if (select === 'all') {
          return (
            <List key={d.id}>
              <li>{d.doctor}</li>
              <li>{d.telephone}</li>
              <li>{d.specialty}</li>
            </List>
          );
        }
        if (d.specialty === select) {
          return (
            <List key={d.id}>
              <li>{d.doctor}</li>
              <li>{d.telephone}</li>
              <li>{d.specialty}</li>
            </List>
          );
        }
        return null;
      })}
    </Wrapper>
  );
}
