import React from 'react';
import Tracker from '.';
import { EmptyBox } from '../../styles/Mixin';

interface TrackerListProps {
  list: Tracker[];
}

function TrackerList({ list }: TrackerListProps) {
  const isTracker = list.length > 0;

  const trackers = list.map((tracker: Tracker, i: number) => {
    return <Tracker key={i} tracker={tracker} />;
  });

  return (
    <div>
      {isTracker ? trackers : <EmptyBox>Tracker 정보가 없습니다.</EmptyBox>}
    </div>
  );
}

export default TrackerList;
