import React from 'react';
import styled from 'styled-components';
import { AiOutlineLink } from 'react-icons/ai';
import { colorAll, fontAll } from '../styles/Variables';

interface ExternalLinkProps {
  link: string;
}

const A = styled.a`
  color: ${colorAll.blue};
  font-size: 0.8rem;
  font-family: ${fontAll.body};
  width: 100%;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;

  svg {
    font-size: 1.2rem;
    margin: 3px 5px;
    color: ${colorAll.light.grey};
  }
`;

function ExternalLink({ link }: ExternalLinkProps) {
  const url = link.slice(0, 4) === 'http' ? link : `https://${link}`;

  return (
    <Div>
      <AiOutlineLink />
      <A href={url}>{link}</A>
    </Div>
  );
}

export default ExternalLink;
