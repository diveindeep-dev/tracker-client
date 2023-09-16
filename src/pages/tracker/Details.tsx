import React, { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { AiOutlineRetweet, AiOutlineLink } from 'react-icons/ai';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';
import NewTracker from '../../components/Tracker/New';

interface DetailsProps {
  cheers: User[];
  signedId: string | undefined;
  count: number;
  retracker?: Retracker;
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
  font-size: 1.2rem;
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
    width: 30px;
    height: 30px;
    border-radius: 100%;
    &:hover {
      color: ${colorAll.blue};
      background-color: ${colorAll.bg.blue};
    }
  }
`;

const RetrackerButton = styled.button`
  ${Icon} {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    &:hover {
      color: ${colorAll.green};
      background-color: ${colorAll.bg.green};
      color: #008a55;
    }
  }
`;

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(142, 142, 142, 0.3);
  z-index: 100;
`;

const Modal = styled.div`
  position: fixed;
  margin: 0 auto;
  top: 20%;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  max-width: 700px;
  min-width: 300px;
  width: 90%;
  z-index: 101;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-bottom: 1px solid ${colorAll.line};
  border-top: 1px solid ${colorAll.line};
`;

function Details({ cheers, signedId, count, retracker }: DetailsProps) {
  const url = window.location.href;
  const [isCopy, setIsCopy] = useState(false);
  const [isClose, setIsClose] = useState<boolean>(true);

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

  const handleClick = () => {
    setIsClose(false);
  };

  return (
    <Div>
      <RetrackerButton onClick={handleClick}>
        <Icon color={retracker ? `#000000` : `${colorAll.line}`}>
          <AiOutlineRetweet />
        </Icon>
      </RetrackerButton>
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
      {!isClose && (
        <>
          <Back onClick={() => setIsClose(true)} />
          <Modal>
            <NewTracker retracker={retracker} setTrue={setIsClose} />
          </Modal>
        </>
      )}
    </Div>
  );
}

export default Details;
