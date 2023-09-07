import React from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { AiOutlineRetweet, AiOutlineLink } from 'react-icons/ai';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';

interface DetailsProps {
  cheers: User[];
  signedId: string | undefined;
  count: number;
}

interface StyleProps {
  color?: string;
}

const Icon = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: ${({ color }) => color};

  div {
    padding: 2px 10px 0 10px;
    font-size: 0.8rem;
    color: initial;
    font-family: ${fontAll.main};
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-bottom: 1px solid ${colorAll.line};
  border-top: 1px solid ${colorAll.line};
  ${Icon} {
  }
`;

function Details({ cheers, signedId, count }: DetailsProps) {
  const isCheered = cheers.length > 0;
  const isSignedUserInCheers = cheers.find((cheer) => cheer._id === signedId);
  const color = isSignedUserInCheers
    ? isSignedUserInCheers.color
    : `${colorAll.light.red}`;

  return (
    <Div>
      <Icon>
        <AiOutlineRetweet />
      </Icon>
      <Icon color={color}>
        {isSignedUserInCheers ? <IoHeart /> : <IoHeartOutline />}
        <div>{isCheered && count}</div>
      </Icon>
      <Icon>
        <AiOutlineLink />
      </Icon>
    </Div>
  );
}

export default Details;
