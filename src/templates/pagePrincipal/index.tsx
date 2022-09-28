import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <Container className="principal">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
