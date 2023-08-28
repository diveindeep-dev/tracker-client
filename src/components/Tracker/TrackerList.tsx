import React from 'react';
import Tracker from '.';

interface TrackerListProps {
  list: Tracker[];
}

function TrackerList({ list }: TrackerListProps) {
  const isTracker = list.length > 0;

  const trackers = list.map((tracker: Tracker, i: number) => {
    return <Tracker key={i} tracker={tracker} />;
  });

  return <div>{isTracker ? trackers : 'Tracker가 없습니다.'}</div>;
}

export default TrackerList;
