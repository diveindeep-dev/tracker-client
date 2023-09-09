import styled, { css } from 'styled-components';
import { colorAll, fontAll, size } from './Variables';

const mediaQuery = (width: number) =>
  `@media screen and (max-width: ${width}px)`;

export const media = {
  tablet: mediaQuery(size.tablet),
  mobile: mediaQuery(size.mobile),
};

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const hoverButton = (color: string) => css`
  font-family: ${fontAll.logo};
  color: ${color};
  border: 1px solid ${color};
  border-radius: 5px;
  &:hover {
    color: ${colorAll.back};
    background: ${color};
  }
`;

export const postContainer = css`
  display: flex;
  padding: 20px 15px;
  border-bottom: 1px solid ${colorAll.line};
`;

export const circle = (size: number) => css`
  ${flexCenter}
  width: ${size}px;
  height: ${size}px;
  border-radius: 100%;
  flex-shrink: 0;
`;

export const EmptyBox = styled.div`
  text-align: center;
  font-family: ${fontAll.body};
  padding: 100px 0;
`;
