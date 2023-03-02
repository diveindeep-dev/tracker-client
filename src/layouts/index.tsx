import React, { ReactNode } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Side from './Side';
import Logo from './Logo';
import styled from 'styled-components';
import { media } from '../styles/Mixin';
import { colorAll } from '../styles/Variables';

interface LayoutProps {
  children: ReactNode;
}

const DesktopWrap = styled.div`
  grid-area: navSide;
  border-right: 1px solid ${colorAll.light.line};
  ${media.mobile} {
    display: none;
  }
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const MobileWrap = styled.div`
  grid-area: mobileBottom;
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

const LAYOUT = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas:
    'navSide header header'
    'navSide main side';

  ${media.tablet} {
    grid-template-columns: 1fr 4fr;
    grid-template-areas:
      'navSide header'
      'navSide main';
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main'
      'mobileBottom';
  }
`;

function Layout({ children }: LayoutProps) {
  return (
    <LAYOUT>
      <Header />
      <DesktopWrap>
        <StickyDiv>
          <div>
            <Logo />
            <Nav />
          </div>
          <Footer />
        </StickyDiv>
      </DesktopWrap>
      <Side />
      <main id="main">{children}</main>
      <MobileWrap>
        <Footer />
        <Nav />
      </MobileWrap>
    </LAYOUT>
  );
}

export default Layout;
