import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/Mixin';
import { colorAll } from '../styles/Variables';

const SIDE = styled.div`
  grid-area: side;
  border-left: 1px solid ${colorAll.line};

  ${media.tablet} {
    display: none;
  }
`;

function Side() {
  return <SIDE>Side</SIDE>;
}

export default Side;
