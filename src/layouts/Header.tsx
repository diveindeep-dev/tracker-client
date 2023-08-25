import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

const LogoWrap = styled.div`
  display: none;

  ${media.mobile} {
    display: flex;
  }
`;

const HEADER = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

function Header() {
  return (
    <HEADER>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <div>
        <Link to={`/signup`}>Sign Up</Link>
        <Link to={`/signin`}>Sign In</Link>
      </div>
    </HEADER>
  );
}

export default Header;
