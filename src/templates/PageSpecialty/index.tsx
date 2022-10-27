import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaComment, FaEdit, FaInfo, FaTrashAlt } from 'react-icons/fa';
import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncSpecialty } from './specialtySlice';
import { Options } from '../../components/OptionsDoctor';
import { List } from '../../components/List/List';
import { Button } from '../../components/Button/Button';

export default function Specialty(): JSX.Element {
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.specialty.data);
  const loading = useAppSelector((state) => state.specialty.loading);
  const [select, setSelect] = useState('Todos');
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
      localPay: '',
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
  const handleDelete = () => {
    console.log('disparo do update');
  };
  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando...</h1>
        </div>
      ) : null}

      <section>
        <Options
          initial="Todos"
          className="type-schedule"
          value={select}
          onChange={handleChange}
        />
        <br />
        <Link to="/especialistas/add">
          <Button type="submit" className="add-operator">
            Cadastrar
          </Button>
        </Link>
      </section>
      {data.map((d) => {
        if (select === 'Todos') {
          return (
            <List key={d.id}>
              <li>{d.doctor}</li>
              <li>{d.telephone}</li>
              <li>{d.specialty}</li>
              <li>
                <Link to={`/especialistas/add/${'info'}/${d.id}`}>
                  <FaInfo />
                </Link>
              </li>
              <li>
                <Link to={`/especialistas/add/${'edit'}/${d.id}`}>
                  <FaEdit />
                </Link>
              </li>
              <li>
                <FaTrashAlt onClick={handleDelete} className="delete-button" />
              </li>
              {d.comment.length !== 0 ? (
                <li>
                  <FaComment />
                </li>
              ) : null}
            </List>
          );
        }
        if (d.specialty === select) {
          return (
            <List key={d.id}>
              <li>{d.doctor}</li>
              <li>{d.telephone}</li>
              <li>{d.specialty}</li>
              <li>
                <FaInfo />
              </li>
              <li>
                <FaEdit />
              </li>
              <li>
                <FaTrashAlt />
              </li>
              <li>
                <FaComment />
              </li>
            </List>
          );
        }
        return null;
      })}
    </Wrapper>
  );
}
