import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Wrapper } from './styles';

export function Patient(): JSX.Element {
  const [name, setName] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [nameMom, setNameMom] = useState('');
  const [address, setAddress] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctor, setDoctor] = useState('');

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          value={name}
          className="name"
          placeHolder="Digite o nome do paciente..."
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          value={dateBirth}
          className="date"
          placeHolder="DD/MM/AAAA"
          onChange={(e) => setDateBirth(e.target.value)}
        />
        <Input
          type="text"
          value={nameMom}
          placeHolder="Digite o Nome da mãe..."
          onChange={(e) => setNameMom(e.target.value)}
        />
        <Input
          type="text"
          value={address}
          placeHolder="Digite o endereço..."
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          value={rg}
          placeHolder="Digite o RG"
          onChange={(e) => setRg(e.target.value)}
        />
        <Input
          type="text"
          value={cpf}
          placeHolder="Digite o CPF..."
          onChange={(e) => setCpf(e.target.value)}
        />
        <Input
          type="text"
          value={specialty}
          placeHolder="Qual a especialidade..."
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <Input
          type="text"
          value={doctor}
          placeHolder="Especifique o Médico ..."
          onChange={(e) => setDoctor(e.target.value)}
        />
        <Button type="button">Cancelar</Button>
        <Button type="submit">Salvar</Button>
        <Button type="submit">Agendar</Button>
      </Form>
    </Wrapper>
  );
}
