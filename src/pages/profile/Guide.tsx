import React, { useState } from 'react';
import {
  guestBio,
  guestSchedules,
  guestTrackerList,
} from '../../config/guestData';
import Bio from './Bio';
import Today from './Today';
import TrackerList from '../../components/Tracker/TrackerList';
import Guide, { Mokup, Tooltip } from '../../components/Guide';

function ProfileGuide() {
  const [schedules, setSchedules] = useState(guestSchedules);
  const [trackerList, setTrackerList] = useState(guestTrackerList);

  const handleToggle = async (id: string) => {
    const target = schedules.findIndex((schedule) => schedule._id === id);
    const copy = [...schedules];
    const trackerCopy = [...trackerList];
    const prevSchedules = trackerCopy[target].schedules.filter(
      (pre) => pre._id !== id,
    );

    if (target !== -1) {
      copy[target] = { ...copy[target], isDone: !copy[target].isDone };
      trackerCopy[target] = {
        ...trackerCopy[target],
        schedules: [...prevSchedules, copy[target]],
      };
      setSchedules(copy);
      setTrackerList(trackerCopy);
    }
  };

  const handleCheer = async (id: string) => {
    const target = schedules.findIndex((schedule) => schedule._id === id);
    const copy = [...schedules];

    if (target !== -1) {
      copy[target] = {
        ...copy[target],
        cheers: [...copy[target].cheers, { _id: 'guest', ...guestBio }],
      };
      setSchedules(copy);
    }
  };

  return (
    <Guide title={`PROFILE`}>
      <Mokup>
        <Bio bio={guestBio} isSignedUser={true} />
        <Today
          schedules={schedules}
          isSignedUser={true}
          handleCheer={handleCheer}
          handleDone={handleToggle}
        />
        <TrackerList list={trackerList} />
        <Tooltip
          position={'top: 250px; right: 20px;'}
          message={`<Bio>
              - 주소로부터 유저 정보 가져오기
              - 프로필 색상으로 헤더 색상 표현
              - 로그인 유저인 경우 Edit 링크 표시`}
        />
        <Tooltip
          position={'top: 320px; right: 20px;'}
          message={`<Today>
              - 유저의 오늘 계획된 TRACK들을 표시
              - 로그인 유저라면 DONE/UNDO 버튼으로 TRACK 관리
              - 달성시 취소선 표시
              - 응원하기 버튼`}
        />
        <Tooltip
          position={'top: 520px; right: 20px;'}
          message={`<TRACKER List>
              - Today의 토글 결과 바로 적용
              - TRACKER 클릭 시 TRACKER 페이지로 이동`}
        />
      </Mokup>
    </Guide>
  );
}

export default ProfileGuide;
