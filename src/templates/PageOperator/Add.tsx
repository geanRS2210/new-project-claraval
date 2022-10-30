import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Wrapper } from '../PageSchedule/styles';
import { database } from '../../mocks/operatorData';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncCreateOperator, asyncUpdateOperator } from './operatorSlice';

export function OperatorAdd(): JSX.Element {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTest, setPasswordTest] = useState('');
  const [level, setLevel] = useState('operator');
  const [check, setCheck] = useState(false);
  const [infoCheck, setCheckInfo] = useState(false);
  const [userID, setUserId] = useState(0);
  // const [data, setData] = useState([{}]);
  const loading = useAppSelector((state) => state.operator.loading);
  const { id, param } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // async function getData() {
  // try {
  //  const response = await axios.get(`/operator/${userID}`);
  //  setData(response.data);
  // } catch (e) {
  //  toast.error('Ocorreu um erro inesperado, entre em contato com o suporte!!);
  // };
  // }

  useEffect(() => {
    if (id && param) {
      const ident = Number(id.slice(1));
      setUserId(ident);
      // getData();
      const parameter = param.slice(1);
      if (parameter === 'edit') setCheck(true);
      if (parameter === 'info') setCheckInfo(true);
      // data.map((d) => {
      database.map((d) => {
        if (d.id === userID) {
          setUser(d.user);
          setLevel(d.level);
          setPassword(d.password);
        }
        return null;
      });
    }
  }, [userID, param]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    let error = false;
    if (user.length < 4) {
      error = true;
      toast.error('Usuário deve conter acima de 4 caracteres');
    }
    if (password.length < 4 || password.length > 25) {
      error = true;
      toast.error('A senha deve conter entre 4 e 25 caracteres');
    }
    if (!check) {
      if (password !== passwordTest) {
        error = true;
        toast.error('As senhas devem ser iguais');
      }
    }
    if (!error) {
      if (check) {
        const data = { user, id: userID, level, password, navigate };
        dispatch(asyncUpdateOperator(data));
      } else {
        const data = { user, id: userID, level, password, navigate };
        dispatch(asyncCreateOperator(data));
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
