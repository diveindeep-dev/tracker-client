import React from 'react';
import styled from 'styled-components';
import { Tag } from '../styles/Tracker';

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
    <Tag as="a" key={i} href={`/tags/${tag.text}`}>
      # {tag.text}
    </Tag>
  ));

  return <Div>{tagsList}</Div>;
}

export default Tags;
