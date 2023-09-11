import React, { ReactNode } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { media } from '../styles/Mixin';

interface DescriptionProps {
  title: string;
  children: ReactNode;
}

interface PositionProps {
  position: string;
}

export const Mokup = styled.div`
  scale: 95%;
  border: 1px solid ${colorAll.line};
  padding: 20px;

  ${media.mobile} {
    scale: 98%;
    padding: 0 10px;
  }
`;

export const Icon = styled.div<PositionProps>`
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
    height: auto;
    bottom: 2.3rem;
    right: -5px;
    font-size: 0.89rem;
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
    right: 5px;
    bottom: -16.5px;
    border-color: #fbfcff transparent transparent;
    border-style: solid;
    border-width: 9px;
    content: '';
    z-index: 1;
  }

  .tooltip::before {
    display: block;
    position: absolute;
    width: 0;
    right: 5px;
    bottom: -18px;
    border-color: ${colorAll.main} transparent transparent;
    border-style: solid;
    border-width: 9px;
    content: '';
    z-index: 0;
  }
`;

export const Relative = styled.div`
  position: relative;
`;

const Sub = styled.div`
  font-size: 1.1rem;
  line-height: 1.1;
  svg {
    font-size: 1rem;
  }
`;

const FeatSection = styled.div`
  padding: 20px 10px 10px;

  ${media.mobile} {
    padding: 20px 5px;
  }
`;

const Div = styled.div`
  padding: 20px;
  font-family: ${fontAll.body};

  h3 {
    font-family: ${fontAll.logo};
    padding: 20px 0;
  }

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

interface TooltipProps {
  message: string;
  position: string;
}

export const Tooltip = ({ message, position }: TooltipProps) => {
  return (
    <Icon position={position}>
      <BsQuestionCircle />
      <div className="tooltip">{message}</div>
    </Icon>
  );
};

function Description({ title, children }: DescriptionProps) {
  return (
    <Div>
      <h2>{title}</h2>
      <FeatSection>
        <Sub>
          랜덤으로 만들어진 Guest {title} 페이지입니다. <br />
          예시 페이지로 현재 페이지에서만 적용됩니다. <br />
          <BsQuestionCircle />를 사용하면 설명을 보실 수 있습니다.
        </Sub>
        {children}
      </FeatSection>
    </Div>
  );
}

export default Description;
