import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';

const Tag = styled(Link)`
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

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 0;
`;

interface TagsProps {
  tags: Tag[];
}

function Tags({ tags }: TagsProps) {
  const tagsList = tags.map((tag: Tag, i: number) => (
    <Tag key={i} to={`/tags/${tag.text}`}>
      # {tag.text}
    </Tag>
  ));

  return <Div>{tagsList}</Div>;
}

export default Tags;
