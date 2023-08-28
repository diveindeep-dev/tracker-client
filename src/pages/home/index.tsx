import React, { useEffect, useState } from 'react';
import { getTrackerListByPageApi } from '../../features/tracker/api';
import NewTracker from '../../components/Tracker/New';
import TrackerList from '../../components/Tracker/TrackerList';
import styled from 'styled-components';
import { fontAll } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

const Div = styled.div`
  min-height: 200px;
  ${flexCenter}
  font-family: ${fontAll.body};
`;

function Home() {
  const [trackerList, setTrackerList] = useState<Tracker[]>([]);
  const [page, setPage] = useState<number>(1);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  const getListSet = async () => {
    const { status, data } = await getTrackerListByPageApi(page);
    if (status === 200) {
      if (target && data.trackers.length < 5) {
        setTarget(null);
      }

      if (reload) {
        setTrackerList(data.trackers);
        setReload(false);
      } else {
        setTrackerList((prev) => [...prev, ...data.trackers]);
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
      <NewTracker setReload={setReload} />
      <TrackerList list={trackerList} />
      <Div ref={setTarget}>You're up to date</Div>
    </div>
  );
}

export default Home;
