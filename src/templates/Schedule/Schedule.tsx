import React, { useEffect, useState, useRef } from 'react';
import { FaUserCheck, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Wrapper } from './styles';
import { Heading } from '../../components/Heading/Heading';

export function Schedule(): JSX.Element {
  const [data, setData] = useState([
    { id: 0, name: '', birthDate: '', nameMom: '', cpf: '' },
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
      },
      {
        id: 2,
        name: 'mauricio',
        birthDate: '22/10/1999',
        nameMom: 'marta',
        cpf: '143.0954.026-82',
      },
      {
        id: 3,
        name: 'marcos',
        birthDate: '22/10/1999',
        nameMom: 'fernanda',
        cpf: '143.0954.026-82',
      },
      {
        id: 4,
        name: 'ana clara',
        birthDate: '22/10/1999',
        nameMom: 'juliana',
        cpf: '143.0954.026-82',
      },
      {
        id: 5,
        name: 'natalia',
        birthDate: '22/10/1999',
        nameMom: 'marcela',
        cpf: '143.0954.026-82',
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
        <FaPlus />
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
      <Heading>Pacientes aguardando agendamento</Heading>
      {data.map((d) => (
        <ul key={d.id}>
          <li>{d.name}</li>
          <li>{d.birthDate}</li>
          <li>{d.cpf}</li>
          <li>{d.nameMom}</li>
          <li>
            <Link to={`/agenda/:${d.id}`}>
              <FaEdit />
            </Link>
          </li>
          <li>
            <FaTrashAlt onClick={() => handleClickDelete(d.id)} />
          </li>
          <li>
            <FaUserCheck />
          </li>
        </ul>
      ))}
    </Wrapper>
  );
}
