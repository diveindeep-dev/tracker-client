import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackerListByTagApi } from '../features/tag/api';
import TrackerList from '../components/Tracker/TrackerList';
import styled from 'styled-components';
import { fontAll } from '../styles/Variables';

const Div = styled.div`
  h1 {
    padding: 20px;
    font-family: ${fontAll.bold};
  }
`;

function TagPage() {
  const { tag } = useParams();
  const [trackerList, setTrackerList] = useState<Tracker[]>([]);

  useEffect(() => {
    if (tag) {
      const getAllTags = async () => {
        const result = await getTrackerListByTagApi(tag);
        if (result) {
          setTrackerList(result.data.tag.trackers);
        }
      };
      getAllTags();
    }
  }, [tag]);

  return (
    <Div>
      <h1># {tag}</h1>
      <TrackerList list={trackerList} />
    </Div>
  );
}

export default TagPage;
