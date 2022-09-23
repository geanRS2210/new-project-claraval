import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Inputs/Input';

export default function Login(): JSX.Element {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

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
    console.log(user);
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!testData()) {
        const data = {
          user,
          password,
        };
        await console.log(data, 'Aqui vem o envio dos nossos dados');
        toast.success('Login efetuado...');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form>
      <Heading>Login/Entrar</Heading>
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
