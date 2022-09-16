import React, { ReactNode } from 'react';

import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

interface Children {
  children?: ReactNode;
}

export default function Home({ children }: Children): JSX.Element {
  return (
    <Container className="principal">
      <Header />
      <Container className="secondary">{children}</Container>
      <Footer />
    </Container>
  );
}
