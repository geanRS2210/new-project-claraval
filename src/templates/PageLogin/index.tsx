import React from 'react';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Heading } from '../../components/Heading/Heading';
import { Input } from '../../components/Inputs/Input';

export default function Login(): JSX.Element {
  return (
    <Form>
      <Heading>Olá mundo!!</Heading>
      <Input type="text" placeHolder="Digite seu usuário ..." />
      <Input type="number" placeHolder="Digite sua senha ..." />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
