import React, { useState } from 'react';
import {
  guestBio,
  guestSchedules,
  guestSingleTrackerList,
} from '../../config/guestData';
import Bio from './Bio';
import Today from './Today';
import TrackerList from '../../components/Tracker/TrackerList';
import Description, {
  Mokup,
  Relative,
  Tooltip,
} from '../../components/Description';

function ProfileDescription() {
  const [schedules, setSchedules] = useState(guestSchedules);
  const [trackerList, setTrackerList] = useState(guestSingleTrackerList);

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
    <Description title={`PROFILE`}>
      <Mokup>
        <Relative>
          <Tooltip
            position={'top: 200px; left: 50%;'}
            message={`Bio 표시
              - 주소로부터 유저 정보 가져오기
              - 프로필 색상을 헤더 배경색으로 표현
              - 로그인한 유저인 경우 Edit 링크 버튼 표시`}
          />
          <Tooltip
            position={'top: 350px; left: 50%;'}
            message={`Today항목
              - 유저의 전체 스케쥴 중 오늘 계획된 TRACK들을 표시
              - 로그인 유저라면 DONE/UNDO 버튼으로 TRACK 관리
              - 달성시 취소선 표시
              - 응원하기 버튼`}
          />
          <Tooltip
            position={'top: 520px; left: 50%;'}
            message={`선태 유저의 TRACKERS
              - 로그인 유저라면 위의 TODAY의 변경 내용 바로 적용
              - TRACKER 클릭 시 해당 `}
          />
          <Bio bio={guestBio} isSignedUser={true} />
          <Today
            schedules={schedules}
            isSignedUser={true}
            handleCheer={handleCheer}
            handleDone={handleToggle}
          />
          <TrackerList list={trackerList} />
        </Relative>
      </Mokup>
    </Description>
  );
}

export default ProfileDescription;
