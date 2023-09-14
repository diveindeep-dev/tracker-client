import React, { useEffect, useState } from 'react';
import { getAllTagApi } from '../features/tag/api';
import Tags from '../components/Tags';
import styled from 'styled-components';
import { media } from '../styles/Mixin';
import { colorAll } from '../styles/Variables';

const SIDE = styled.div`
  grid-area: side;
  padding: 20px;
  border-left: 1px solid ${colorAll.line};
  h2 {
    padding: 5px 0;
  }
  div > svg {
    display: none;
  }

  ${media.tablet} {
    display: none;
  }
`;

function Side() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getAllTags = async () => {
      const result = await getAllTagApi();
      if (result) {
        setTags(result.data.tags);
      }
    };
    getAllTags();
  }, []);

  return (
    <SIDE>
      <h2>Latest Tags</h2>
      <Tags tags={tags} />
    </SIDE>
  );
}

export default Side;
