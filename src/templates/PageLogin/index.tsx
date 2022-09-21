import { string } from 'prop-types';
import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Inputs/Input';
import { Message } from '../../components/Message/Message';

export default function Login(): JSX.Element {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(['']);

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

  const testData = async () => {
    let test = false;
    if (user.length === 0 || user.length > 50) {
      test = true;
      console.log('cheguei no erro');
      toast.error('Usuario inválido');
    }
    if (password.length === 0 || password.length < 8) {
      test = true;
      toast.error('Sua senha deve conter entre 8 e 50 caracteres');
    }
    return test;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!testData()) {
      const data = {
        user,
        password,
      };
      console.log(data);
    }
  };

  return (
    <Form>
      <Heading>Olá mundo!!</Heading>
      <Input
        value={user}
        type="text"
        placeHolder="Digite seu usuário ..."
        onChange={handleChangeUser}
      />
      <Input
        value={password}
        type="password"
        placeHolder="Digite sua senha ..."
        onChange={handleChangePassword}
      />
      <Button type="submit" onClick={handleSubmit}>
        Enviar
      </Button>
    </Form>
  );
}
