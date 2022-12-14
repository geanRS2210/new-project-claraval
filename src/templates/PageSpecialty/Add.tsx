import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Options } from '../../components/OptionsDoctor';
import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncUpdateSpecialty, asyncCreateSpecialty } from './specialtySlice';
import axios from '../../config/axios';
import { authReverse } from '../PageLogin/authSlice';
import { useFormat } from '../../hooks/useFormat';

export function SpecialtyAdd(): JSX.Element {
  const [doctor, setDoctor] = useState('');
  const [telephone, setTelephone] = useState('');
  const [whatsapp, setwhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [localPay, setLocalPay] = useState('no');
  const [comments, setComments] = useState('');
  const [checkInfo, setCheckInfo] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [userID, setUserID] = useState(0);
  const dispatch = useAppDispatch();
  const [setFormat] = useFormat();
  const { id, param } = useParams();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.specialty.loading);
  const levelPriority = useAppSelector((state) => state.auth.level);

  interface Data {
    id: number;
    doctor: string;
    address: string;
    number: string;
    telephone: string;
    whatsapp: string;
    specialty: string;
    comments: string;
    localPay: string;
    createdAt: string;
    updatedAt: string;
  }

  const setCamps = (d: Data, parameter: string) => {
    if (parameter === 'edit') setCheckEdit(true);
    if (parameter === 'info') setCheckInfo(true);
    setUserID(d.id);
    setDoctor(d.doctor);
    setTelephone(d.telephone);
    setwhatsapp(d.whatsapp);
    setAddress(d.address);
    setNumber(d.number);
    setSpecialty(d.specialty);
    setLocalPay(d.localPay);
    setComments(d.comments);
  };

  async function getData(parameter: string) {
    try {
      const token = localStorage.getItem('authorization');
      const ident = Number(id);
      const response = await axios.get(`/specialty/${ident}`, {
        headers: {
          authorization: `${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      });
      setCamps(response.data, parameter);
    } catch (e) {
      const err = (e as Error).message;
      if (err === 'Request failed with status code 401') {
        dispatch(authReverse());
        toast.error('Fa??a login novamente, Tempo de sess??o esgotado!!');
      } else {
        toast.error(
          'Ocorreu um erro inesperado, entre em contato com o suporte!!',
        );
      }
    }
  }

  useEffect(() => {
    if (levelPriority !== 'administrator') {
      navigate('/');
    }
    if (id && param) {
      getData(param);
    } else {
      setCamps(
        {
          id: 0,
          doctor: '',
          address: '',
          number: '',
          telephone: '',
          whatsapp: '',
          specialty: '',
          comments: '',
          localPay: '',
          createdAt: '',
          updatedAt: '',
        },
        '',
      );
    }
  }, [id, param]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let test = false;
    if (doctor.length < 4) {
      test = true;
      toast.error('Nome do m??dico tem que ter acima de 4 letras');
    }
    if (telephone.length < 11) {
      test = true;
      toast.error('Numero de telefone invalido');
    }
    if (whatsapp.length > 1 && whatsapp.length < 11) {
      test = true;
      toast.error('Numero de whatsapp invalido');
    }
    if (address.length === 0) {
      test = true;
      toast.error('Endere??o n??o pode ficarem branco!!');
    }
    if (number.length === 0) {
      test = true;
      toast.error('O numero do consult??rio n??o pode ficar em branco!!');
    }
    if (specialty.length === 0) {
      test = true;
      toast.error('O campo de especialidade m??dica n??o pode ficar em branco');
    }
    if (!test) {
      if (!checkEdit)
        dispatch(
          asyncCreateSpecialty({
            id: userID,
            doctor,
            address,
            number,
            telephone,
            whatsapp,
            specialty,
            localPay,
            comments,
            navigate,
          }),
        );
      if (checkEdit)
        dispatch(
          asyncUpdateSpecialty({
            id: userID,
            doctor,
            address,
            number,
            telephone,
            whatsapp,
            specialty,
            localPay,
            comments,
            navigate,
          }),
        );
    }
  };

  const handleCancel = () => {
    setDoctor('');
    setTelephone('');
    setwhatsapp('');
    setAddress('');
    setNumber('');
    setSpecialty('');
    setLocalPay('no');
    setComments('');
    setUserID(0);
    navigate('/especialistas');
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
            ? 'Informa????es'
            : checkEdit
            ? 'P??gina de edi????o'
            : 'Cadastre um novo m??dico'}
        </h1>

        <Input
          type="text"
          value={doctor}
          placeHolder="Nome do m??dico..."
          onChange={(e) => setDoctor(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="tel"
          value={telephone}
          placeHolder="Digite o telefone ..."
          onChange={(e) => setTelephone(setFormat('fixTel', e))}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={whatsapp}
          placeHolder="Digite um whatsapp..."
          onChange={(e) => setwhatsapp(setFormat('telephone', e))}
          disabled={checkInfo}
        />
        <Input
          type="text"
          value={address}
          placeHolder="Digite o endere??o da cl??nica..."
          onChange={(e) => setAddress(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="number"
          className="number-local"
          value={number}
          min="0"
          onChange={(e) => setNumber(e.target.value)}
          disabled={checkInfo}
        />
        <Options
          initial=""
          value={specialty}
          className="doctor"
          onChange={(e) => setSpecialty(e.target.value)}
          disabled={checkInfo}
        />
        <section>
          <label>Local de pagamento - Pagamento ?? feito no consult??rio?</label>
          <select
            value={localPay}
            onChange={(e) => setLocalPay(e.target.value)}
            className="local-pay"
            disabled={checkInfo}
          >
            <option value="N??o">N??o</option>
            <option value="Sim">Sim</option>
          </select>
        </section>
        <label>Fa??a seus comentarios</label>
        <br />
        <textarea
          className="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={checkInfo}
        />
        <br />
        <Button type="submit" onClick={handleClick} disabled={checkInfo}>
          Salvar
        </Button>
        <Button type="reset" onClick={handleCancel} disabled={checkInfo}>
          Cancelar
        </Button>
      </Form>
    </Wrapper>
  );
}
