import React from 'react';
import styled from 'styled-components';
import { flexCenter, media } from '../styles/Mixin';

interface EmojiProps {
  emoji: string;
  color: string;
  size: number;
}

interface StyleProps {
  color: string;
  size: number;
}

const Div = styled.div<StyleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100%;
  ${flexCenter}
  padding-top: ${({ size }) => size / 13}px;
  font-size: ${({ size }) => (size / 5) * 3}px;
  background-color: ${({ color }) => `${color}`};

  ${media.mobile} {
    width: ${({ size }) => size * 0.9}px;
    height: ${({ size }) => size * 0.9}px;
    padding-top: ${({ size }) => (size * 0.9) / 13}px;
    font-size: ${({ size }) => ((size * 0.9) / 5) * 3}px;
  }

  &:hover {
    filter: brightness(85%);
  }
`;

function Pic({ emoji, color, size }: EmojiProps) {
  return (
    <Div color={color} size={size}>
      {emoji}
    </Div>
  );
}

export default Pic;
