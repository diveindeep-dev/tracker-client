import React from 'react';
import styled from 'styled-components';
import { circle, media } from '../styles/Mixin';

interface PicProps {
  emoji: string;
  color: string;
  size?: number[];
}

interface StyleProps {
  color: string;
  size: number[];
}

const PIC = styled.div<StyleProps>`
  ${({ size }) => circle(size[0])}
  padding-top: ${({ size }) => size[0] / 5 - 5}px;
  font-size: ${({ size }) => (size[0] / 5) * 3}px;
  background-color: ${({ color }) => `${color}`};

  ${media.mobile} {
    ${({ size }) => circle(size[1])}
    padding-top: ${({ size }) => size[1] / 5 - 5}px;
    font-size: ${({ size }) => (size[1] / 5) * 3}px;
  }
`;

function Pic(props: PicProps) {
  const { emoji, color, size = [50] } = props;

  return (
    <PIC size={size} color={color}>
      {emoji}
    </PIC>
  );
}

export default Pic;
