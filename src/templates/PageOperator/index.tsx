import React, { useEffect, useState } from 'react';
import { FaEdit, FaInfo, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from '../PageSchedule/styles';
import { List } from '../../components/List/List';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Button } from '../../components/Button/Button';
import { asyncOperator, asyncUpdateOperator } from './operatorSlice';

export default function Operator(): JSX.Element {
  const [data, setData] = useState([
    {
      id: 0,
      user: '',
      password: '',
      level: '',
      state: '',
    },
  ]);
  const [select, setSelect] = useState('valid');
  const dispatch = useAppDispatch();
  const database = useAppSelector((state) => state.operator.data);
  const loading = useAppSelector((state) => state.operator.loading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncOperator());
    setData(database);
  }, [data]);

  const handleClickDelete = (e: number) => {
    dispatch(asyncUpdateOperator({ id: e, state: 'invalid', navigate }));
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
          <option value="valid">Ativos</option>
          <option value="invalid">Inativos</option>
        </select>
        <br />
        <Link to="/operadores/add">
          <Button type="submit" className="add-operator">
            Cadastrar
          </Button>
        </Link>
      </section>
      {data.map((d) => {
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
    </Wrapper>
  );
}
