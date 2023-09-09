import React, { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { AiOutlineRetweet, AiOutlineLink } from 'react-icons/ai';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

interface DetailsProps {
  cheers: User[];
  signedId: string | undefined;
  count: number;
}

interface StyleProps {
  color?: string;
}

const Copied = styled.div`
  position: fixed;
  bottom: 130px;
  padding: 20px 30px;
  font-family: ${fontAll.main};
  color: #ffffff;
  background-color: ${colorAll.main};
  border-radius: 10px;
  z-index: 200;
`;

const Icon = styled.div<StyleProps>`
  ${flexCenter}
  font-size: 1.3rem;
  color: ${({ color }) => color};

  div {
    padding: 2px 10px 0 10px;
    font-size: 0.8rem;
    color: initial;
    font-family: ${fontAll.main};
  }
`;

const CopyButton = styled.button`
  ${Icon} {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    &:hover {
      color: ${colorAll.blue};
      background-color: ${colorAll.bg.blue};
    }
  }
`;

const Div = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-bottom: 1px solid ${colorAll.line};
  border-top: 1px solid ${colorAll.line};
`;

function Details({ cheers, signedId, count }: DetailsProps) {
  const url = window.location.href;
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsCopy(false), 3000);
  }, [isCopy]);

  const isCheered = cheers.length > 0;
  const isSignedUserInCheers = cheers.find((cheer) => cheer._id === signedId);
  const color = isSignedUserInCheers
    ? isSignedUserInCheers.color
    : `${colorAll.light.red}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      setIsCopy(false);

      return false;
    }
  };

  return (
    <Div>
      <Icon color={`${colorAll.line}`}>
        <AiOutlineRetweet />
      </Icon>
      <Icon color={color}>
        {isSignedUserInCheers ? <IoHeart /> : <IoHeartOutline />}
        <div>{isCheered && count}</div>
      </Icon>
      <CopyButton onClick={() => handleCopy(url)}>
        <Icon>
          <AiOutlineLink />
        </Icon>
      </CopyButton>
      {isCopy && <Copied>Copied to clipboard</Copied>}
    </Div>
  );
}

export default Details;
