import React, { useState } from 'react';
import Tracks from '../../components/Tracker/Tracks';
import Tags from '../../components/Tags';
import Details from './Details';
import User from './User';
import Schedules from '../../components/Schedules';
import Guide, { Mokup, Relative, Tooltip } from '../../components/Guide';
import { guestSingleTracker, guestBio } from '../../config/guestData';
import { TrackerTitle } from '../../styles/Tracker';

function TrackerGuide() {
  const [tracker, setTracker] = useState(guestSingleTracker);
  const [schedules, setSchedules] = useState(tracker.schedules);

  const handleToggle = async (id: string) => {
    const target = schedules.findIndex((schedule) => schedule._id === id);
    const copy = [...schedules];

    if (target !== -1) {
      copy[target] = { ...copy[target], isDone: !copy[target].isDone };

      setSchedules(copy);
    }
  };

  const handleCheer = async (id: string) => {
    const target = schedules.findIndex((schedule) => schedule._id === id);
    const copy = [...schedules];
    const trackerCopy = { ...tracker };
    const prevSchedules = trackerCopy.schedules.filter((pre) => pre._id !== id);
    const isGuest = trackerCopy.cheers.find((cheer) => cheer._id === 'guest');

    if (target !== -1) {
      copy[target] = {
        ...copy[target],
        cheers: [...copy[target].cheers, { _id: 'guest', ...guestBio }],
      };
      console.log(copy[target], '?');
      trackerCopy.schedules = [...prevSchedules, copy[target]];

      if (!isGuest) {
        trackerCopy.cheers = [
          ...trackerCopy.cheers,
          { _id: 'guest', ...guestBio },
        ];
      }

      setSchedules(copy);
      setTracker(trackerCopy);
    }
  };

  return (
    <Guide title={`TRACKER`}>
      <Mokup>
        <Tooltip
          position={'top: 70px; right: 20px;'}
          message={`유저 프로필
              - 클릭시 프로필 페이지로 연결
              - 로그인한 유저 TRACKER 메뉴 버튼 표시
              - 삭제 버튼 모달로 표시`}
        />
        <User
          path={`/profile`}
          tracker={tracker}
          isSignedUser={true}
          handleDelete={() => {}}
        />
        <Relative>
          <TrackerTitle>{tracker.text}</TrackerTitle>
          <Tooltip
            isLeft={true}
            position={'top: 10px; left: 130px;'}
            message={`TRACKER 정보
          - 미리 계획했던 날짜만 활성화
          - 달성시 유저 컬러로 체크
          - 비달성시 회색으로 x표시`}
          ></Tooltip>
        </Relative>
        <Tracks
          startDate={tracker.created_at}
          color={tracker.user.color}
          schedules={schedules}
        />
        <Tags tags={tracker.tags} />
        <Relative>
          <Tooltip
            isLeft={true}
            position={'top: 35%; left: 15px;'}
            message={`<추가 기능>
          - Retracker: 정보를 가져와 새로운 TRACKER를 작성
          - 응원: 응원 받은 총 횟수/ 응원한 TRACCKER일시, 유저 컬러로 표시
          - 링크복사: 현재 주소 클립보드에 복사`}
          />
          <Details
            cheers={tracker.cheers}
            signedId={'guest'}
            count={
              tracker.schedules.map((schedule) => schedule.cheers).flat(1)
                .length
            }
            retracker={{
              _id: tracker._id,
              text: tracker.text,
              user: tracker.user,
              tags: tracker.tags,
            }}
          />
        </Relative>
        <Relative>
          <Tooltip
            isLeft={true}
            position={'top: 30px; left: 100px;'}
            message={`TRACKS 태그
              - 오늘 TRACK은 TODAY
              - 달성시 COMPLETE
              - 비달성시 EXPIRED`}
          />
          <Tooltip
            position={'top: 50%; right: 90px;'}
            message={`DONE/UNDO 토글 버튼
              - 로그인 유저인 경우 표시
              - 오늘 TRACK만 적용 가능
              - 상단 TRACKER표에 반영`}
          />
          <Tooltip
            position={'top: 30px; right: 5px;'}
            message={`응원 버튼
              - TRACK마다 응원 가능
              - TRACKER 응원에 반영`}
          />
          <h3>ALL TRACKS</h3>
          <Schedules
            schedules={schedules}
            isSignedUser={true}
            handleDone={handleToggle}
            handleCheer={handleCheer}
            isTag={true}
          />
        </Relative>
      </Mokup>
    </Guide>
  );
}

export default TrackerGuide;
