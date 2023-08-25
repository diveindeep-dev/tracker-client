import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from '../styles/Mixin';
import { fontAll } from '../styles/Variables';

const LOGO = styled(Link)`
  ${flexCenter}
  padding: 0 20px;
  height: 80px;
  font-size: 2rem;
  font-family: ${fontAll.logo};
`;

function Logo() {
  return <LOGO to={`/`}>TRACKER</LOGO>;
}

export default Logo;
