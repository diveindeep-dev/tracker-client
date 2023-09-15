import styled from 'styled-components';
import { colorAll, fontAll } from './Variables';

interface StyleProps {
  size?: number;
}
export const TrackerTitle = styled.div`
  padding: 8px 0;
  font-family: ${fontAll.body};
  font-size: 1.5rem;
`;

export const Tag = styled.div`
  font-family: ${fontAll.body};
  font-size: 0.8rem;
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  padding: 5px 10px 4px;
  background-color: ${colorAll.line};
  z-index: 11;

  &:hover {
    background-color: ${colorAll.light.grey};
    color: #ffffff;
  }
`;

export const Name = styled.div<StyleProps>`
  font-family: ${fontAll.main};
  font-size: ${({ size }) => (size ? `${size}rem` : `1.2rem`)};
  padding-bottom: 3px;
`;

export const ProfileId = styled.div<StyleProps>`
  font-size: ${({ size }) => (size ? `${size}rem` : `0.8rem`)};
  font-family: ${fontAll.main};
  color: ${colorAll.light.grey};
  padding: 3px 5px;
`;
