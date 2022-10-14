import React, { useEffect, useState } from 'react';
import {
  FaUserCheck,
  FaTrashAlt,
  FaEdit,
  FaInfo,
  FaPrint,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Wrapper } from './styles';
import { List } from '../../components/List/List';
import { database } from '../../example/database';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { patientRemove } from './patientSlice';
import jspdf from '../../config/jspdf';

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
    },
  ]);
  const [select, setSelect] = useState('awaiting');
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const response = axios.get('/patient')
    // setData(response.data)
    setData(database);
  }, []);

  const handleClickDelete = (e: number) => {
    dispatch(patientRemove(e));
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelect(event);
  };

  return (
    <Wrapper>
      <section>
        <select
          className="type-schedule"
          value={select}
          onChange={handleChange}
        >
          <option value="awaiting">Aguardando agendamento</option>
          <option value="take">Para retirar guias</option>
          <option value="overdue">Guias não retiradas</option>
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
                  <FaTrashAlt onClick={() => handleClickDelete(d.id)} />
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
