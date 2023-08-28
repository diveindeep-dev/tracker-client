import React from 'react';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';

const Tag = styled.div`
  font-family: ${fontAll.body};
  font-size: 0.8rem;
  margin-right: 5px;
  border-radius: 20px;
  padding: 5px 10px 4px;
  background-color: ${colorAll.line};
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0;
`;

interface TagsProps {
  tags: string[];
}

function Tags({ tags }: TagsProps) {
  const tagsList = tags.map((tag: string, i: number) => (
    <Tag key={i}>#{tag}</Tag>
  ));
  return <Div>{tagsList}</Div>;
}

export default Tags;
