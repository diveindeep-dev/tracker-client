import React from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import styled from 'styled-components';
import { colorAll } from '../styles/Variables';
import { flexCenter } from '../styles/Mixin';

interface HeartProps {
  cheeredId: string;
  cheers: User[];
  handleCheer: (id: string) => Promise<void>;
  isCheered: boolean;
}

interface StyleProps {
  $isCheered?: boolean;
}

const Icon = styled.div<StyleProps>`
  ${flexCenter}
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  color: ${({ $isCheered }) =>
    $isCheered ? `${colorAll.light.red}` : `${colorAll.light.grey}`};
`;

const Button = styled.button`
  ${Icon} {
    border-radius: 100%;
    &:hover {
      color: ${colorAll.light.red};
      background-color: ${colorAll.bg.red};
    }
  }
`;

function Heart(props: HeartProps) {
  const { cheeredId, handleCheer, isCheered } = props;

  const heartIcon = isCheered ? (
    <Icon $isCheered={isCheered}>
      <IoHeart />
    </Icon>
  ) : (
    <Button onClick={() => handleCheer(cheeredId)}>
      <Icon>
        <IoHeartOutline />
      </Icon>
    </Button>
  );

  return <div>{heartIcon}</div>;
}

export default Heart;
