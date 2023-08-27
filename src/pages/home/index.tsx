import React, { useEffect, useState } from 'react';
import { getTrackerListByPageApi } from '../../features/tracker/api';
import NewTracker from '../../components/Tracker/New';
import Tracker from '../../components/Tracker';

function Home() {
  const [trackerList, setTrackerList] = useState<Tracker[]>([]);
  const [page, setPage] = useState<number>(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const getListSet = async () => {
    const { status, data } = await getTrackerListByPageApi(page);
    if (status === 200) {
      if (target && data.trackers.length < 5) {
        setTarget(null);
      }
      setTrackerList((prev) => [...prev, ...data.trackers]);
    }
  };

  useEffect(() => {
    getListSet();
  }, [page]);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  const trackers = trackerList.map((tracker: Tracker, i: number) => {
    return <Tracker key={i} tracker={tracker} />;
  });

  return (
    <div>
      <NewTracker />
      <div>{trackers}</div>
      <div ref={setTarget}>You're up to date</div>
    </div>
  );
}

export default Home;
