import React from 'react';
import styled, { css } from 'styled-components';
import { circle, flexCenter, media } from '../styles/Mixin';
import { fontAll } from '../styles/Variables';

interface EmojiProps {
  emoji: string;
  color: string;
  size: number;
  isHover?: boolean;
}

interface StyleProps {
  color: string;
  size: number;
  $isHover?: boolean;
}

const Div = styled.div<StyleProps>`
  ${({ size }) => circle(size)}
  font-family: ${fontAll.logo};
  font-size: ${({ size }) => (size / 5.5) * 3}px;
  background-color: ${({ color }) => `${color}`};

  ${media.mobile} {
    ${({ size }) => circle(size * 0.9)}
    font-size: ${({ size }) => ((size * 0.9) / 5) * 3}px;
  }

  ${({ $isHover }) =>
    $isHover &&
    css`
      &:hover {
        filter: brightness(85%);
      }
    `}
`;

function Pic({ emoji, color, size, isHover = true }: EmojiProps) {
  return (
    <Div color={color} size={size} $isHover={isHover}>
      {emoji}
    </Div>
  );
}

export default Pic;
