import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Inputs/Input';
import { Options } from '../../components/OptionsDoctor';
import { useFormat } from '../../hooks/useFormat';
import { Wrapper } from '../PageSchedule/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { asyncUpdateSpecialty, asyncCreateSpecialty } from './specialtySlice';

export function SpecialtyAdd(): JSX.Element {
  const [setFormat] = useFormat();
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
  // const [data, setData] = useState([{}]);
  const dispatch = useAppDispatch();
  const { id, param } = useParams();
  const navigate = useNavigate();
  const database = useAppSelector((state) => state.specialty.data);
  const loading = useAppSelector((state) => state.specialty.loading);

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
      const ident = Number(id);
      setUserID(ident);
      // getData();
      if (param === 'edit') setCheckEdit(true);
      if (param === 'info') setCheckInfo(true);
      // data.map((d) => {
      database.map((d) => {
        if (d.id === userID) {
          console.log(d.doctor);
          setDoctor(d.doctor);
          setTelephone(d.telephone);
          setwhatsapp(d.whatsapp);
          setAddress(d.address);
          setNumber(d.number);
          setSpecialty(d.specialty);
          setLocalPay(d.localPay);
          setComments(d.comment);
        }
        return null;
      });
    }
  }, [userID, param]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let test = false;
    if (doctor.length < 4) {
      test = true;
      toast.error('Nome do médico tem que ter acima de 4 letras');
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
      toast.error('Endereço não pode ficarem branco!!');
    }
    if (number.length === 0) {
      test = true;
      toast.error('O numero do consultório não pode ficar em branco!!');
    }
    if (specialty.length === 0) {
      test = true;
      toast.error('O campo de especialidade médica não pode ficar em branco');
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
    setComments('');
    navigate('/especialistas');
  };

  return (
    <Wrapper>
      {loading ? (
        <div className="loading">
          <h1>Carregando</h1>
        </div>
      ) : null}

      <Form>
        <Input
          type="text"
          value={doctor}
          placeHolder="Nome do médico..."
          onChange={(e) => setDoctor(e.target.value)}
          disabled={checkInfo}
        />
        <Input
          type="tel"
          value={telephone}
          placeHolder="Digite o telefone ..."
          onChange={(e) => setTelephone(setFormat('telephone', e))}
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
          placeHolder="Digite o endereço da clínica..."
          onChange={(e) => setAddress(e.target.value)}
          disabled={checkInfo}
        />
        <Options
          initial=""
          value={specialty}
          className="doctor"
          onChange={(e) => setSpecialty(e.target.value)}
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
        <section>
          <label>Local de pagamento - Pagamento é feito no consultório?</label>
          <select
            value={localPay}
            onChange={(e) => setLocalPay(e.target.value)}
            className="local-pay"
            disabled={checkInfo}
          >
            <option value="Não">Não</option>
            <option value="Sim">Sim</option>
          </select>
        </section>
        <label>Faça seus comentarios</label>
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
