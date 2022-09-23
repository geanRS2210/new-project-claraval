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

export function Schedule(): JSX.Element {
  const [data, setData] = useState([
    { id: 0, name: '', birthDate: '', nameMom: '', cpf: '', state: '' },
  ]);
  const [select, setSelect] = useState('awaiting');
  useEffect(() => {
    const database = [
      {
        id: 1,
        name: 'jose',
        birthDate: '22/10/1999',
        nameMom: 'Maria',
        cpf: '143.0954.026-82',
        state: 'awaiting',
      },
      {
        id: 2,
        name: 'mauricio',
        birthDate: '22/10/1999',
        nameMom: 'marta',
        cpf: '143.0954.026-82',
        state: 'awaiting',
      },
      {
        id: 3,
        name: 'marcos',
        birthDate: '22/10/1999',
        nameMom: 'fernanda',
        cpf: '143.0954.026-82',
        state: 'take',
      },
      {
        id: 4,
        name: 'ana clara',
        birthDate: '22/10/1999',
        nameMom: 'juliana',
        cpf: '143.0954.026-82',
        state: 'awaiting',
      },
      {
        id: 5,
        name: 'natalia',
        birthDate: '22/10/1999',
        nameMom: 'marcela',
        cpf: '143.0954.026-82',
        state: 'overdue',
      },
      {
        id: 6,
        name: 'joana miranda',
        birthDate: '22/10/1999',
        nameMom: 'carla',
        cpf: '143.0954.026-82',
        state: 'finished',
      },
    ];
    setData(database);
  }, []);

  const handleClickDelete = (e: number) => {
    console.log(e, 'removido com sucesso');
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
              <li>{d.cpf}</li>
              <li>{d.nameMom}</li>
              <li>
                {d.state === 'awaiting' ? (
                  <Link to={`/agendar/:${d.id}`}>
                    <FaEdit />
                  </Link>
                ) : (
                  <Link to={`/agendar/:${d.id}`}>
                    <FaInfo />
                  </Link>
                )}
              </li>
              <li>
                {d.state === 'awaiting' ? (
                  <Link to={`/agendar/:${d.id}`}>
                    <FaUserCheck />
                  </Link>
                ) : d.state === 'take' ? (
                  <FaPrint />
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
