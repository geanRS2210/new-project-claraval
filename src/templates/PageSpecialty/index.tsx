import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FaComment, FaEdit, FaInfo, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncSpecialty } from './specialtySlice';
import { Options } from '../../components/OptionsDoctor';
import { List } from '../../components/List/List';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Inputs/Input';
import axios from '../../config/axios';
import { authReverse } from '../PageLogin/authSlice';

export default function Specialty(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const database = useAppSelector((state) => state.specialty.data);
  const loading = useAppSelector((state) => state.specialty.loading);
  const deslog = useAppSelector((state) => state.specialty.deslog);
  const levelPriority = useAppSelector((state) => state.auth.level);
  const [select, setSelect] = useState('Todos');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([
    {
      id: 0,
      doctor: '',
      address: '',
      number: '',
      telephone: '',
      whatsapp: '',
      specialty: '',
      comments: '',
      localPay: '',
    },
  ]);
  const [dataSearch, setdataSearch] = useState(data);
  useEffect(() => {
    dispatch(asyncSpecialty());
  }, []);

  useEffect(() => {
    setData(database);
    setdataSearch(database);
  }, [database]);

  useEffect(() => {
    if (levelPriority !== 'administrator') {
      navigate('/');
    }
    if (deslog) dispatch(authReverse());
  }, [deslog]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelect(event);
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/specialty/${id}`);
      dispatch(asyncSpecialty());
      toast.success('Médico excluído com sucesso!!');
    } catch (e) {
      toast.error(
        'Ocorreu um erro inesperado, entre em contato com o suporte!!',
      );
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const val = e.target.value.toLocaleLowerCase();
    if (e.target.value.length !== 0) {
      const val2 = data.filter((d) => {
        if (d.doctor.toLocaleLowerCase().includes(val)) {
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

      <section>
        <Options
          initial="Todos"
          className="type-specialty"
          value={select}
          onChange={handleChange}
        />
        <Link to="/especialistas/add">
          <Button type="submit">Cadastrar</Button>
        </Link>
        <Input
          type="search"
          value={search}
          className="search"
          onChange={(e) => handleSearch(e)}
        />

        {dataSearch.map((d) => {
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
                  <FaTrashAlt
                    onClick={() => handleDelete(d.id)}
                    className="delete-button"
                  />
                </li>
                {d.comments.length !== 0 ? (
                  <li className="popover">
                    <FaComment className="delete-button" />
                    <textarea value={d.comments} className="comment-popover" />
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
                  <FaTrashAlt
                    onClick={() => handleDelete(d.id)}
                    className="delete-button"
                  />
                </li>
                {d.comments.length !== 0 ? (
                  <li className="popover">
                    <FaComment className="delete-button" />
                    <textarea value={d.comments} className="comment-popover" />
                  </li>
                ) : null}
              </List>
            );
          }
          return null;
        })}
      </section>
    </Wrapper>
  );
}
