import React from 'react';
import { AiFillTags } from 'react-icons/ai';
import styled from 'styled-components';
import { Tag } from '../styles/Tracker';
import { colorAll } from '../styles/Variables';

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 5px 0;
  svg {
    font-size: 1.2rem;
    margin: 3px 5px;
    color: ${colorAll.light.grey};
  }
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

  return (
    <Div>
      {tags.length > 0 && <AiFillTags />}
      {tagsList}
    </Div>
  );
}

export default Tags;
