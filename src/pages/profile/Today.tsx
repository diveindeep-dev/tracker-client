import React from 'react';
import Schedules from '../../components/Schedules';
import styled from 'styled-components';
import { postContainer } from '../../styles/Mixin';
import { fontAll } from '../../styles/Variables';

interface TodayProps {
  schedules: ScheduleFull[];
  isSignedUser: boolean;
  handleDone: (id: string) => Promise<void>;
  handleCheer: (id: string) => Promise<void>;
}

const Text = styled.div`
  text-align: center;
  font-family: ${fontAll.body};
`;

const ScheduleList = styled.div`
  padding: 20px 20px 0;
`;

const Div = styled.div`
  ${postContainer}
  display: flex;
  flex-direction: column;
`;

function Today(props: TodayProps) {
  const { schedules, isSignedUser, handleDone, handleCheer } = props;
  const isSchedule = schedules.length > 0;

  return (
    <Div>
      <h2>Today</h2>
      <ScheduleList>
        {isSchedule ? (
          <Schedules
            schedules={schedules}
            isSignedUser={isSignedUser}
            handleDone={handleDone}
            handleCheer={handleCheer}
          />
        ) : (
          <Text>오늘의 Tracker가 아직 없습니다.</Text>
        )}
      </ScheduleList>
    </Div>
  );
}

export default Today;
