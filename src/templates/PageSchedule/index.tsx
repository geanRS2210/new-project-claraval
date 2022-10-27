import React, { useEffect, useState } from 'react';
import {
  FaUserCheck,
  FaTrashAlt,
  FaEdit,
  FaInfo,
  FaPrint,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from './styles';
import { List } from '../../components/List/List';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import jspdf from '../../config/jspdf';
import { asyncSchedulePatient, asyncUpdatePatient } from './patientSlice';

export function Schedule(): JSX.Element {
  const [data, setData] = useState([
    {
      id: 0,
      name: '',
      birthDate: '',
      nameMom: '',
      cpf: '',
      state: '',
      telephone: '',
      address: '',
      doctor: '',
      rg: '',
    },
  ]);
  const [select, setSelect] = useState('awaiting');
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.patient.data);
  const loading = useAppSelector((state) => state.patient.loading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncSchedulePatient());
    setData(database);
  }, [database]);

  const handleClickDelete = (e: number) => {
    dispatch(asyncUpdatePatient({ id: e, state: 'overdue', navigate }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelect(event);
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando...</h1>
        </div>
      ) : null}

      <section>
        <select
          className="type-schedule"
          value={select}
          onChange={handleChange}
        >
          <option value="awaiting">Aguardando agendamento</option>
          <option value="take">Para retirar guias</option>
          <option value="overdue">Guias não retiradas/Canceladas</option>
          <option value="finished">Agendamento finalizado</option>
        </select>
      </section>
      {data.map((d) => {
        if (d.state === select) {
          return (
            <List key={d.id}>
              <li>{d.name}</li>
              <li>{d.birthDate}</li>
              <li>{d.telephone}</li>
              <li>
                {d.state === 'awaiting' ? (
                  <Link to={`/agendar/:${'edit'}/:${d.id}`}>
                    <FaEdit />
                  </Link>
                ) : (
                  <Link to={`/agendar/:${'info'}/:${d.id}`}>
                    <FaInfo />
                  </Link>
                )}
              </li>
              <li>
                {d.state === 'take' ? (
                  <FaTrashAlt
                    onClick={() => handleClickDelete(d.id)}
                    className="delete-button"
                  />
                ) : null}
              </li>
              <li>
                {d.state === 'awaiting' ? (
                  <Link to={`/agendar/:${'finish'}/:${d.id}`}>
                    <FaUserCheck />
                  </Link>
                ) : d.state === 'take' ? (
                  <FaPrint onClick={() => jspdf(d)} />
                ) : null}
              </li>
              <li>
                {d.state === 'awaiting' ? (
                  <FaTrashAlt
                    onClick={() => handleClickDelete(d.id)}
                    className="delete-button"
                  />
                ) : null}
              </li>
            </List>
          );
        }
        return null;
      })}
    </Wrapper>
  );
}
