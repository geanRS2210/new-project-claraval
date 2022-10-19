import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useFormat } from '../../hooks/useFormat';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Wrapper } from './styles';
import { Check } from '../../components/Check/Check';
import { Doctor } from '../../components/SelectDoctor/Doctor';
import { database } from '../../mocks/patientData';
import { asyncCreatePatient, asyncUpdatePatient } from './patientSlice';

export function Patient(): JSX.Element {
  const [name, setName] = useState('');
  const [birthDate, setDateBirth] = useState('');
  const [telephone, settelephone] = useState('');
  const [nameMom, setNameMom] = useState('');
  const [address, setAddress] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointmeintDate, setappointmeintDate] = useState('');
  const [value, setvalue] = useState('');
  const [check, setCheck] = useState(false);
  const [checkInfo, setCheckInfo] = useState(false);
  // const [data, setData] = useState([{}]);
  const [setFormat] = useFormat();
  const { id, param } = useParams();
  const [userID, setID] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // async function getData() {
  // try {
  //  const response = await axios.get(`/patient/${userID}`);
  //  setData(response.data);
  // } catch (e) {
  //  toast.error('Ocorreu um erro inesperado, entre em contato com o suporte!!);
  // };
  // }

  useEffect(() => {
    if (id && param) {
      const indent = Number(id.slice(1));
      setID(indent);
      // getData();
      const parameter = param.slice(1);
      if (parameter === 'finish') setCheck(true);
      if (parameter === 'info') setCheckInfo(true);
      // data.map((d) => {
      database.map((d) => {
        if (d.id === userID) {
          setName(d.name);
          setDateBirth(d.birthDate);
          setNameMom(d.nameMom);
          setCpf(d.cpf);
          settelephone(d.telephone);
          setAddress(d.address);
          setDoctor(d.doctor);
          setRg(d.rg);
        }
        return null;
      });
    } else {
      setName('');
      setDateBirth('');
      setNameMom('');
      setCpf('');
      settelephone('');
      setAddress('');
      setDoctor('');
      setRg('');
      setCheck(false);
    }
  }, [userID, param]);

  const checkErr = (): boolean => {
    let errors = false;
    if (name.length === 0) {
      toast.error('nome não pode ficar em branco');
      errors = true;
    }
    if (birthDate.length < 10) {
      toast.error('Data de nascimento incorreta');
      errors = true;
    }
    if (telephone.length < 13 || telephone.length > 14) {
      toast.error('Número de telefone incorreto');
      errors = true;
    }
    if (check) {
      if (nameMom.length === 0) {
        toast.error('Nome da mãe é obrigatório');
        errors = true;
      }
      if (address.length === 0) {
        toast.error('Endereço é obrigatório');
        errors = true;
      }
      if (rg.length === 0) setRg('Não informado');
      if (cpf.length < 14) {
        errors = true;
        toast.error('Cpf é obrigatório');
      }
      if (doctor.length === 0) {
        toast.error('Nome do médico é obrigatório');
        errors = true;
      }
      if (appointmeintDate.length === 0) {
        toast.error('A data do agendamento é obrigatório');
        errors = true;
      }
      if (value.length === 0) setvalue('200');
    }
    return errors;
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    state: string,
  ) => {
    e.preventDefault();
    const errors = checkErr();
    if (!errors) {
      dispatch(
        asyncCreatePatient({
          name,
          birthDate,
          nameMom,
          cpf,
          address,
          state,
          telephone,
          doctor,
          rg,
          navigate,
        }),
      );
    }
  };
  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = checkErr();
    if (!errors) {
      dispatch(
        asyncUpdatePatient({
          id: userID,
          name,
          birthDate,
          nameMom,
          cpf,
          address,
          telephone,
          doctor,
          rg,
          navigate,
        }),
      );
    }
  };

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          value={name}
          className="name"
          placeHolder="Digite o nome do paciente..."
          onChange={(e) => setName(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={birthDate}
          className="date"
          placeHolder="DD/MM/AAAA"
          onChange={(e) => {
            setDateBirth(setFormat('date', e));
          }}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={telephone}
          className="telephone"
          placeHolder="(00) 0 0000-0000"
          onChange={(e) => settelephone(setFormat('telephone', e))}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={nameMom}
          placeHolder="Digite o Nome da mãe..."
          onChange={(e) => setNameMom(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={address}
          placeHolder="Digite o endereço..."
          onChange={(e) => setAddress(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={rg}
          placeHolder="Digite o RG"
          onChange={(e) => setRg(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={cpf}
          placeHolder="Digite o CPF..."
          onChange={(e) => setCpf(setFormat('cpf', e))}
          disabled={checkInfo}
        />
        <Doctor
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          disabled={checkInfo}
          classname="doctor"
        />
        <Check check={check}>
          <Input
            type="text"
            value={appointmeintDate}
            placeHolder="Data do agendamento"
            className="date"
            onChange={(e) => {
              setappointmeintDate(setFormat('date', e));
            }}
            disabled={checkInfo}
          />
          <Input
            type="text"
            value={value}
            className="date"
            placeHolder="Valor da consulta"
            onChange={(e) => setvalue(e.target.value)}
            disabled={checkInfo}
          />
        </Check>
        <a href="/agendar">
          <Button type="button">Cancelar</Button>
        </a>
        {!check ? (
          <>
            <Button
              type="submit"
              onClick={
                param?.slice(1) === 'edit'
                  ? (e) => handleEdit(e)
                  : (e) => handleClick(e, 'awaiting')
              }
            >
              Salvar
            </Button>
            <Button type="submit" onClick={() => setCheck(true)}>
              Agendar
            </Button>
          </>
        ) : (
          <Button type="submit" onClick={(e) => handleClick(e, 'take')}>
            Agendar
          </Button>
        )}
      </Form>
    </Wrapper>
  );
}
