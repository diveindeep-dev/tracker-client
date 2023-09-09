import React from 'react';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { flexCenter } from '../styles/Mixin';
import { Link } from 'react-router-dom';

const Div = styled.div`
  ${flexCenter}
  height: 100%;
  font-family: ${fontAll.logo};
  color: ${colorAll.light.grey};
  h1 {
    font-size: 3rem;
  }
`;

function NotFound() {
  return (
    <Div>
      <Link to={`/`}>
        <h1>NOT FOUND</h1>
      </Link>
    </Div>
  );
}

export default NotFound;
