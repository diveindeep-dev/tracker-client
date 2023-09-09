import { css, styled } from 'styled-components';
import { colorAll, fontAll } from './Variables';
import { flexCenter, media } from './Mixin';

interface WeekProps {
  $weekend: string;
}

export const trackBorder = (order: number) => css`
  border-top: 1px solid ${colorAll.light.grey};
  border-bottom: 1px solid ${colorAll.light.grey};
  border-right: 1px solid ${colorAll.light.grey};
  border-left: ${order === 0 && `1px solid ${colorAll.light.grey};`};

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${media.mobile} {
    border-top: ${order > 6 && `0px`};
    border-left: ${(order === 0 || order === 7) &&
    `1px solid ${colorAll.light.grey};`};
  }
`;

export const TRACKS = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${colorAll.back};

  ${media.mobile} {
    flex-wrap: wrap;
  }
`;

export const WeekBack = styled.div<WeekProps>`
  padding: 50% 0 0 50%;
  font-family: ${fontAll.logo};
  font-size: clamp(2.8rem, calc(100vw / 14), 3.5rem);

  color: ${({ $weekend }) =>
    $weekend === 'SUN'
      ? `${colorAll.bg.red}`
      : $weekend === 'SAT'
      ? `${colorAll.bg.blue}`
      : `${colorAll.bg.grey}`};

  ${media.mobile} {
    font-size: calc(100vw / 7);
  }
`;

export const dateStyle = css`
  ${flexCenter}
  position: absolute;
  font-size: clamp(1.5rem, calc(100vw / 35), 2rem);
  font-family: ${fontAll.logo};

  ${media.mobile} {
    font-size: calc(100vw / 15);
  }
`;

export const trackAbsolute = css`
  ${flexCenter}
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
