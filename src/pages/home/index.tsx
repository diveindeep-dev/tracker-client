import React, { useEffect, useState } from 'react';
import { getTrackerListByPageApi } from '../../features/tracker/api';
import NewTracker from '../../components/Tracker/New';
import TrackerList from '../../components/Tracker/TrackerList';
import { EmptyBox } from '../../styles/Mixin';

function Home() {
  const [trackerList, setTrackerList] = useState<Tracker[]>([]);
  const [page, setPage] = useState<number>(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const getListSet = async () => {
    const result = await getTrackerListByPageApi(page);
    if (result) {
      if (result.status === 200) {
        if (target && result.data.trackers.length < 5) {
          setTarget(null);
        }

        if (reload) {
          setTrackerList(result.data.trackers);
          setReload(false);
        } else {
          setTrackerList((prev) => [...prev, ...result.data.trackers]);
        }
      }
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

  useEffect(() => {
    if (reload) {
      setPage(1);
      getListSet();
    }
  }, [reload]);

  return (
    <div>
      <NewTracker setTrue={setReload} />
      <TrackerList list={trackerList} />
      {trackerList.length > 0 && (
        <EmptyBox ref={setTarget}>You're up to date</EmptyBox>
      )}
    </div>
  );
}

export default Home;
