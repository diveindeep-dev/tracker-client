import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Side from './Side';
import Nav from './Nav';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

interface LayoutProps {
  children: ReactNode;
}

const LAYOUT = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    'nav header header'
    'nav main side'
    'footer footer footer';

  ${media.tablet} {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      'nav header'
      'nav main'
      'footer footer';
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main'
      'footer'
      'nav';
  }
`;

function Layout({ children }: LayoutProps) {
  return (
    <LAYOUT>
      <Header />
      <Nav />
      <main id="main">{children}</main>
      <Side />
      <Footer />
    </LAYOUT>
  );
}

export default Layout;
