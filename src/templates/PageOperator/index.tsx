import React, { useEffect, useState } from 'react';
import { FaEdit, FaInfo, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from '../PageSchedule/styles';
import { List } from '../../components/List/List';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Button } from '../../components/Button/Button';
import { asyncOperator, asyncUpdateOperator } from './operatorSlice';
import { Input } from '../../components/Inputs/Input';

export default function Operator(): JSX.Element {
  const [data, setData] = useState([
    {
      id: 0,
      user: '',
      password_hash: '',
      level: '',
      state: '',
      created_at: '',
      updated_at: '',
    },
  ]);
  const [select, setSelect] = useState('valid');
  const [search, setSearch] = useState('');
  const [dataSearch, setdataSearch] = useState(data);
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.operator.data);
  const loading = useAppSelector((state) => state.operator.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncOperator());
  }, []);

  useEffect(() => {
    setData(database);
    setdataSearch(database);
  }, [database]);

  const handleClickDelete = (e: number) => {
    dispatch(asyncUpdateOperator({ id: e, state: 'invalid', navigate }));
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
        if (d.user.toLocaleLowerCase().includes(val)) {
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
        <select
          className="type-schedule"
          value={select}
          onChange={handleChange}
        >
          <option value="valid">Ativos</option>
          <option value="invalid">Inativos</option>
        </select>
        <Link to="/operadores/add">
          <Button type="submit">Cadastrar</Button>
        </Link>
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
                <li>{d.user}</li>
                <li>{d.state === 'valid' ? 'Ativo' : 'Inativo'}</li>
                <li>{d.level}</li>
                {d.state === 'valid' ? (
                  <>
                    <li>
                      <Link to={`/operadores/add/:${'edit'}/:${d.id}`}>
                        <FaEdit />
                      </Link>
                    </li>
                    <li>
                      <Link to={`/operadores/add/:${'info'}/:${d.id}`}>
                        <FaInfo />
                      </Link>
                    </li>
                    <li>
                      <FaTrashAlt
                        onClick={() => handleClickDelete(d.id)}
                        className="delete-button"
                      />
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to={`/operadores/add/:${'info'}/:${d.id}`}>
                      <FaInfo />
                    </Link>
                  </li>
                )}
              </List>
            );
          }
          return null;
        })}
      </section>
    </Wrapper>
  );
}
