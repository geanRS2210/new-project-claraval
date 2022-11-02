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
import { jspdf } from '../../config/jspdf';
import { asyncSchedulePatient, asyncUpdatePatient } from './patientSlice';
import { Input } from '../../components/Inputs/Input';

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
      appointmeintDate: '',
      value: '',
      createdAt: '',
      updatedAt: '',
    },
  ]);
  const [dataSearch, setdataSearch] = useState(data);
  const [select, setSelect] = useState('awaiting');
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.patient.data);
  const loading = useAppSelector((state) => state.patient.loading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncSchedulePatient());
    setData(database);
    setdataSearch(database);
  }, [database]);

  const handleClickDelete = (e: number) => {
    dispatch(asyncUpdatePatient({ id: e, state: 'overdue', navigate }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelect(event);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const val = e.target.value.toLocaleLowerCase();
    if (e.target.value.length !== 0) {
      const val2 = data.filter((d) => {
        if (d.name.toLocaleLowerCase().includes(val)) {
          return d;
        }
        return null;
      });
      setdataSearch(val2);
    } else {
      setdataSearch(data);
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando</h1>
        </div>
      ) : null}

      <section className="list-schedule">
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
        <Input
          type="search"
          value={search}
          className="search"
          onChange={(e) => handleSearch(e)}
        />
        {dataSearch.map((d) => {
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
      </section>
    </Wrapper>
  );
}
