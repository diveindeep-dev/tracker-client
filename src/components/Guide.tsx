import React, { ReactNode } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { flexCenter, media } from '../styles/Mixin';

interface GuideProps {
  title: string;
  children: ReactNode;
}

interface PositionProps {
  position: string;
  isLeft?: boolean;
}

export const Relative = styled.div`
  position: relative;
`;

export const ToolIcon = styled.div<PositionProps>`
  position: absolute;
  z-index: 100;
  ${({ position }) =>
    css`
      ${position}
    `};

  font-size: 1.2rem;
  color: ${colorAll.light.grey};

  &:hover {
    cursor: pointer;
    color: ${colorAll.main};
  }

  &:hover > .tooltip {
    display: block;
  }

  .tooltip {
    display: none;
    position: absolute;
    white-space: pre-line;
    width: max-content;
    max-width: 250px;
    height: auto;
    bottom: 2.3rem;
    ${({ isLeft }) => (isLeft ? `left: -20px;` : `right: -5px;`)};
    font-size: 0.9rem;
    line-height: 1.1;
    color: ${colorAll.black};
    background-color: #f0f4fe;
    border: ${colorAll.main} solid 1px;
    border-radius: 3px;
    padding: 7px 10px 5px;
    z-index: 100;
  }

  .tooltip::after {
    display: block;
    position: absolute;
    width: 0;
    ${({ isLeft }) => (isLeft ? `left: 20px;` : `right: 5px;`)};
    bottom: -16.5px;
    border-color: #f0f4fe transparent transparent;
    border-style: solid;
    border-width: 9px;
    content: '';
    z-index: 1;
  }

  .tooltip::before {
    display: block;
    position: absolute;
    width: 0;
    ${({ isLeft }) => (isLeft ? `left: 20px;` : `right: 5px;`)};

    /* left: 20px; */
    bottom: -18px;
    border-color: ${colorAll.main} transparent transparent;
    border-style: solid;
    border-width: 9px;
    content: '';
    z-index: 0;
  }
`;

export const Mokup = styled.div`
  position: relative;
  border: 1px solid ${colorAll.line};
  padding: 20px;
  ${media.mobile} {
    padding: 10px;
  }
`;

const Title = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: 20px 0;
  div {
    ${flexCenter}
    margin: 2px;
    svg {
      margin-bottom: 2px;
      width: 15px;
      height: 15px;
    }
  }

  h1 {
    font-size: 2.2rem;
    padding: 20px 0;
  }
`;

const Div = styled.div`
  padding: 20px;
  font-family: ${fontAll.body};
  h3 {
    padding: 20px 0;
  }

  ${media.mobile} {
    padding: 10px;
  }
`;

interface TooltipProps {
  message: string;
  position: string;
  isLeft?: boolean;
}

export const Tooltip = ({
  message,
  position,
  isLeft = false,
}: TooltipProps) => {
  return (
    <ToolIcon position={position} isLeft={isLeft}>
      <BsQuestionCircle />
      <div className="tooltip">{message}</div>
    </ToolIcon>
  );
};

function Guide({ title, children }: GuideProps) {
  return (
    <Div>
      <Title>
        <h1>{title}</h1>
        <div>{title} 소개 페이지입니다.</div>
        <div>기능 소개 페이지로, 현재 페이지에서만 적용됩니다.</div>
        <div>
          <BsQuestionCircle />를 사용하면 자세한 설명을 보실 수 있습니다.
        </div>
      </Title>
      {children}
    </Div>
  );
}

export default Guide;
