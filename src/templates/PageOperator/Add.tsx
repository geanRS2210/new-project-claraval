import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncCreateOperator, asyncUpdateOperator } from './operatorSlice';
import axios from '../../config/axios';
import { authReverse } from '../PageLogin/authSlice';

export function OperatorAdd(): JSX.Element {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTest, setPasswordTest] = useState('');
  const [level, setLevel] = useState('operator');
  const [check, setCheck] = useState(false);
  const [infoCheck, setCheckInfo] = useState(false);
  const [userID, setUserId] = useState(0);
  const loading = useAppSelector((state) => state.operator.loading);
  const desloged = useAppSelector((state) => state.operator.deslog);
  const priorityLevel = useAppSelector((state) => state.auth.level);
  const { id, param } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface Data {
    id: number;
    user: string;
    password_hash: string;
    level: string;
    state: string;
    created_at: string;
    updated_at: string;
  }

  const setCamps = (data: Data, ident: number) => {
    const parameter = param?.slice(1);
    if (parameter === 'edit') setCheck(true);
    if (parameter === 'info') setCheckInfo(true);
    setUserId(ident);
    setUser(data.user);
    setLevel(data.level);
  };

  async function getData() {
    try {
      const token = localStorage.getItem('authorization');
      const ident = Number(id?.slice(1));
      const response = await axios.get(`/operator/${ident}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      setCamps(response.data, ident);
    } catch (e) {
      const result = (e as Error).message;
      if (result === 'Request failed with status code 401') {
        toast.error('Fa??a login noavmente, tempo de sess??o esgotado!!');
        dispatch(authReverse());
      } else {
        toast.error(
          'Ocorreu um erro inesperado, entre em contato com o suporte!!',
        );
      }
    }
  }
  useEffect(() => {
    if (priorityLevel !== 'administrator') {
      navigate('/');
    }
    if (id && param) {
      getData();
    }
  }, [userID, param]);
  useEffect(() => {
    if (desloged) dispatch(authReverse());
  }, [desloged]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    let error = false;
    if (user.length < 4) {
      error = true;
      toast.error('Usu??rio deve conter acima de 4 caracteres');
    }
    if (!check) {
      if (password.length < 4 || password.length > 25) {
        error = true;
        toast.error('A senha deve conter entre 4 e 25 caracteres');
      }
      if (password !== passwordTest) {
        error = true;
        toast.error('As senhas devem ser iguais');
      }
    }
    if (!error) {
      if (check) {
        const dataAsync = {
          user,
          id: userID,
          level,
          password,
          navigate,
        };
        dispatch(asyncUpdateOperator(dataAsync));
      } else {
        const dataAsync = {
          user,
          state: 'valid',
          level,
          password,
          navigate,
        };
        dispatch(asyncCreateOperator(dataAsync));
      }
    }
  };

  const handleCancel = () => {
    setUser('');
    setLevel('');
    setPassword('');
    setLevel('operator');
    navigate('/operadores');
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando</h1>
        </div>
      ) : null}

      <Form className="form-add">
        <Input
          type="text"
          value={user}
          placeHolder="Digite o nome do operador"
          onChange={(e) => setUser(e.target.value)}
          disabled={infoCheck}
        />
        <Input
          type="text"
          value={password}
          placeHolder="Digite a sua senha..."
          onChange={(e) => setPassword(e.target.value)}
          disabled={infoCheck}
        />
        {id ? null : (
          <Input
            type="text"
            value={passwordTest}
            placeHolder="Confirme sua senha..."
            onChange={(e) => setPasswordTest(e.target.value)}
            disabled={infoCheck}
          />
        )}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="password-test"
          disabled={infoCheck}
        >
          <option value="administrator">Administrador</option>
          <option value="operator">Operador</option>
        </select>
        <br />
        <Button
          type="submit"
          onClick={(e) => handleClick(e)}
          disabled={infoCheck}
        >
          Salvar
        </Button>
        <Button type="reset" disabled={infoCheck} onClick={handleCancel}>
          Cancelar
        </Button>
      </Form>
    </Wrapper>
  );
}
