import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncAuth, selectValue } from './authSlice';
import { Wrapper } from '../PageSchedule/styles';

export default function Login(): JSX.Element {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { loading } = useAppSelector(selectValue);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const valueInput = e.target.value;
    setPassword(valueInput);
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const valueInput = e.target.value;
    setUser(valueInput);
  };

  const testData = () => {
    let test = false;
    if (user.length === 0 || user.length > 50) {
      test = true;
      toast.error('Usuario inválido');
    }
    if (password.length === 0 || password.length < 8) {
      test = true;
      toast.error('Sua senha deve conter entre 8 e 50 caracteres');
    }
    return test;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!testData()) {
        const data = {
          user,
          password,
          navigate,
        };
        dispatch(asyncAuth(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Form className="form-auth">
        <img src="images/brasao-claraval.png" alt="brasão claraval" />
        <section className="section-auth">
          <h4>Prefeitura</h4>
          <h1>Claraval</h1>
        </section>
        {loading ? (
          <div className="loading">
            <h1>Carregando...</h1>
          </div>
        ) : null}

        <Input
          value={user}
          type="text"
          placeHolder="Digite seu usuário..."
          onChange={handleChangeUser}
          className="user-auth"
        />
        <Input
          value={password}
          type="password"
          placeHolder="Digite sua senha ..."
          onChange={handleChangePassword}
          className="password-auth"
        />
        <Button type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </Form>
    </Wrapper>
  );
}
