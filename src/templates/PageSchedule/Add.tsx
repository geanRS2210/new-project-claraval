import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFormat } from '../../hooks/useFormat';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Wrapper } from './styles';
import { Check } from '../../components/Check/Check';
import { Doctor } from '../../components/SelectDoctor/Doctor';
import { asyncCreatePatient, asyncUpdatePatient } from './patientSlice';
import axios from '../../config/axios';
import { authReverse } from '../PageLogin/authSlice';

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
  const [hour, setHour] = useState('');
  const [value, setvalue] = useState('');
  const [check, setCheck] = useState(false);
  const [checkInfo, setCheckInfo] = useState(false);
  const [createdAt, setcreatedAt] = useState('');
  const [updatedAt, setupdatedAt] = useState('');
  const [userId, setId] = useState(1);
  const loading = useAppSelector((state) => state.patient.loading);
  const [setFormat] = useFormat();
  const { id, param } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  interface Data {
    id: number;
    name: string;
    birthDate: string;
    nameMom: string;
    cpf: string;
    state: string;
    telephone: string;
    address: string;
    doctor: string;
    rg: string;
    appointmeintDate: string;
    hour: string;
    value: string;
    created_at: string;
    updated_at: string;
  }

  function setCamps(data: Data, params: string) {
    const parameter = params.slice(1);
    if (params.length === 0) {
      setCheck(false);
      setCheckInfo(false);
    }
    if (parameter === 'finish') setCheck(true);
    if (parameter === 'info') setCheckInfo(true);
    setId(data.id);
    setName(data.name);
    setDateBirth(data.birthDate);
    setNameMom(data.nameMom);
    setCpf(data.cpf);
    settelephone(data.telephone);
    setAddress(data.address);
    setDoctor(data.doctor);
    setRg(data.rg);
    setcreatedAt(data.created_at);
    setupdatedAt(data.updated_at);
  }

  async function getData(ids: string, params: string) {
    try {
      const token = localStorage.getItem('authorization');
      const indent = Number(ids.slice(1));
      const response = await axios.get(`/patient/${indent}`, {
        headers: {
          authorization: `${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      });
      setCamps(response.data, params);
    } catch (e) {
      const err = (e as Error).message;
      if (err === 'Request failed with status code 401') {
        dispatch(authReverse());
        toast.error('Faça login novamente, Tempo de sessão esgotado!!');
      } else {
        toast.error(
          'Ocorreu um erro inesperado entre em contato com o suporte!!',
        );
      }
    }
  }

  useEffect(() => {
    if (id && param) {
      getData(id, param);
    } else {
      setCamps(
        {
          id: 0,
          name: '',
          birthDate: '',
          nameMom: '',
          cpf: '',
          state: '',
          telephone: '',
          address: '',
          doctor: '',
          rg: '',
          appointmeintDate: '',
          hour,
          value: '',
          created_at: '',
          updated_at: '',
        },
        '',
      );
    }
  }, [id, param]);

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
      console.log(hour);
      if (hour.length !== 5) {
        toast.error('Horário de agendamento incorreto!!');
        errors = true;
      }
      if (value.length === 0) setvalue('200,00');
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
          appointmeintDate,
          hour,
          value,
          createdAt,
          updatedAt,
          navigate,
        }),
      );
    }
  };
  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    state?: string,
  ) => {
    e.preventDefault();
    const errors = checkErr();
    if (!errors) {
      dispatch(
        asyncUpdatePatient({
          id: userId,
          name,
          birthDate,
          nameMom,
          cpf,
          address,
          telephone,
          doctor,
          state: state || 'awaiting',
          rg,
          appointmeintDate,
          hour,
          value,
          createdAt,
          updatedAt,
          navigate,
        }),
      );
    }
  };

  const handleCancel = () => {
    setName('');
    setDateBirth('');
    setNameMom('');
    setCpf('');
    settelephone('');
    setAddress('');
    setDoctor('');
    setRg('');
    setCheck(false);
    navigate('/agenda');
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando</h1>
        </div>
      ) : null}
      <Form className="form-add">
        <h1>
          {checkInfo
            ? 'Informações'
            : check
            ? 'Página de edição'
            : 'Cadastre um novo Paciente'}
        </h1>
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
          pattern="[0-9]"
        />
        <Input
          type="tel"
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
          onChange={(e) => {
            console.log(e.target.value);
            setDoctor(e.target.value);
          }}
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
            value={hour}
            placeHolder="Horário..."
            className="date"
            onChange={(e) => {
              setHour(e.target.value);
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
        <Button type="reset" onClick={handleCancel} disabled={checkInfo}>
          Cancelar
        </Button>
        {!check || param?.slice(1) === 'edit' ? (
          <Button
            type="submit"
            disabled={checkInfo}
            onClick={
              param?.slice(1) === 'edit'
                ? (e) => handleEdit(e)
                : (e) => handleClick(e, 'awaiting')
            }
          >
            Salvar
          </Button>
        ) : null}
        <Button
          type="submit"
          disabled={checkInfo}
          onClick={(e) => {
            if (!check) {
              e.preventDefault();
              setCheck(true);
            } else if (
              param?.slice(1) === 'edit' ||
              param?.slice(1) === 'finish'
            ) {
              handleEdit(e, 'take');
            } else {
              handleClick(e, 'take');
            }
          }}
        >
          Agendar
        </Button>
      </Form>
    </Wrapper>
  );
}
