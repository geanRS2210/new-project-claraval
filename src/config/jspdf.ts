import jsPDF from 'jspdf';
import axios from './axios';

interface Props {
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
}
export const jspdf = async (props: Props) => {
  const { doctor } = props;
  const id = doctor.match(/\d+/);
  const doctorString = doctor.replace(`${id}`, '');
  const response = await axios.get(`/specialty/${id}`);
  const testData = response.data;
  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    unit: 'px',
    format: 'a5',
    orientation: 'landscape',
  });

  const img = 'http://localhost:3000/images/brasao-claraval.png';

  doc.addImage(img, 'PNG', 50, 25, 43, 46);
  doc.setFont('times');
  doc.setFontSize(12);
  doc.text('PREFEITURA MUNICIPAL DE CLARAVAL-MG', 140, 30);
  doc.setFontSize(10);
  doc.text('Secretaria Municipal de saúde', 140, 48);
  doc.setFontSize(10);
  doc.text('AUTORIZAÇÃO UNIMED', 180, 70);
  doc.setFontSize(10);
  doc.text(`Nome do Paciente:  ${props.name.toUpperCase()}`, 30, 100);
  doc.setFontSize(10);
  doc.text(`Data de Nascimento:  ${props.birthDate.toUpperCase()}`, 30, 120);
  doc.setFontSize(10);
  doc.text(`Nome da Mãe:  ${props.nameMom.toUpperCase()}`, 30, 140);
  doc.setFontSize(10);
  doc.text(`Endereço:  ${props.address.toUpperCase()}`, 30, 160);
  doc.setFontSize(10);
  doc.text(
    `RG:  ${props.rg.toUpperCase()}                                                      CPF:${props.cpf.toUpperCase()}`,
    30,
    180,
  );
  doc.setFontSize(10);
  doc.text(`Atendimento:  ${testData.specialty.toUpperCase()}`, 30, 200);
  doc.setFontSize(10);
  doc.text(`Médico:  ${doctorString.toUpperCase()}`, 30, 220);
  doc.setFontSize(10);
  doc.text(
    'Autorizo a retirada de guia para atendimento, conforme CONVÊNIO PARTICULAR.',
    30,
    240,
  );
  doc.setFontSize(10);
  doc.text(
    '_______________________________________________________________',
    90,
    270,
  );
  doc.setFontSize(10);
  doc.text('Valber Vidal Cintra', 190, 290);
  doc.addPage('a5', 'landscape');
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.text('CONSULTA MARCADA PARA:', 155, 35);
  doc.text(`${props.appointmeintDate}   às   ${props.hour}Hrs`, 172, 55);
  if (testData.localPay === 'Sim') {
    doc.text('PAGAR A GUIA NO CONSULTÓRIO', 70, 75);
  } else {
    doc.text(
      'PAGAR A GUIA NO CONVÊNIO EXTERNO DO HOSPITAL SÃO JOAQUIM',
      70,
      75,
    );
  }
  doc.text(`Valor da Consulta: R$${props.value}`, 70, 105);
  doc.text(`Pagamento em dinheiro  (de preferência trocado!!)`, 70, 115);
  if (testData.localPay !== 'Sim') {
    doc.text(`Endereço do Hospital São Joaquim`, 70, 195);
    doc.text(`R. Abílio Coutinho, 331 - São Joaquim, Franca - SP`, 70, 205);
  }
  doc.text(`Endereço do Consultório:`, 70, 145);
  doc.text(`${testData.address}, ${testData.number}`, 70, 155);
  doc.text(`${testData.telephone}`, 70, 165);
  doc.text(
    `1 - Levar documentos(RG,CPF) !!PAGAR GUIA COM ANTECEDÊNCIA!!`,
    70,
    235,
  );
  doc.text(
    `2 - Caso houver desistência avisar com 24hs de antecedência.`,
    70,
    245,
  );
  doc.text(`3 - Levar receitas e exames que tenha.`, 70, 255);

  doc.output('dataurlnewwindow');
};
