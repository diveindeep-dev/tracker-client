import React, { ReactNode } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

interface LayoutProps {
  children: ReactNode;
}

const LAYOUT = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    'header header header'
    'nav main side'
    'nav footer footer';

  ${media.tablet} {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      'header header'
      'nav main'
      'nav footer';
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
      <Footer />
    </LAYOUT>
  );
}

export default Layout;
