import React, { useEffect, useState } from 'react';
import { getTrackerListByPageApi } from '../../features/tracker/api';
import NewTracker from '../../components/Tracker/New';
import Tracker from '../../components/Tracker';

function Home() {
  const [trackerList, setTrackerList] = useState<Tracker[]>([]);
  const [page, setPage] = useState<number>(1);

  const getListSet = async () => {
    const { status, data } = await getTrackerListByPageApi(page);
    setTrackerList(data.trackers);
  };

  useEffect(() => {
    getListSet();
  }, [page]);

  const trackers = trackerList.map((tracker: Tracker, i: number) => {
    return <Tracker key={i} tracker={tracker} />;
  });

  return (
    <div>
      <NewTracker />
      <div>{trackers}</div>
    </div>
  );
}

export default Home;
