import jsPDF from 'jspdf';

interface Props {
  id: number;
  name: string;
  birthDate: string;
  nameMom: string;
  cpf: string;
  state: string;
  telephone: string;
}

export default function jspdf(props: Props) {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF();

  console.log(props);

  doc.text('./teste.html', 10, 10);
  doc.output('dataurlnewwindow');
}
