import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LOGO = styled(Link)`
  height: 80px;
  font-size: 2rem;
`;

function Logo() {
  return <LOGO to={`/`}>TRACKER</LOGO>;
}

export default Logo;
