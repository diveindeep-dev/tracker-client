import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { colorAll } from '../styles/Variables';
import { flexCenter } from '../styles/Mixin';

const Div = styled.div`
  ${flexCenter}
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  color: ${colorAll.light.grey};
`;

function Heart() {
  return (
    <Div>
      <IoHeartOutline />
    </Div>
  );
}

export default Heart;
