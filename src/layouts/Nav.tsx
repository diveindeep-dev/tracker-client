import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

const NAV = styled.nav`
  display: flex;
  flex-direction: column;
  ${media.mobile} {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const LogoWrap = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

const Div = styled.div`
  grid-area: nav;
`;

function Nav() {
  return (
    <Div>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <NAV>
        <Link to={`/home`}>Home</Link>
        <Link to={`/profile`}>Profile</Link>
        <Link to={`/setting`}>Setting</Link>
      </NAV>
    </Div>
  );
}

export default Nav;
