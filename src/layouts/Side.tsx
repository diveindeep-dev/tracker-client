import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/Mixin';

const SIDE = styled.div`
  grid-area: side;

  ${media.tablet} {
    display: none;
  }
`;

function Side() {
  return <SIDE>Side</SIDE>;
}

export default Side;
