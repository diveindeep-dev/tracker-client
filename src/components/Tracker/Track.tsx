import React from 'react';
import { format, isSaturday, isSunday } from 'date-fns';
import Mark from './Mark';
import styled from 'styled-components';
import {
  WeekBack,
  dateStyle,
  trackAbsolute,
  trackBorder,
} from '../../styles/Track';
import { flexCenter, media } from '../../styles/Mixin';
import { colorAll } from '../../styles/Variables';

interface TrackProps {
  day: string;
  order: number;
  schedules: Schedule[];
  color: string;
}

interface BorderProps {
  order: number;
}

interface TrackStyleProps {
  $isScheduled: Schedule | undefined;
}

const Slash = styled.div`
  width: 2%;
  height: 150%;
  background-color: ${colorAll.light.grey};
  transform: rotate(45deg);
`;

const MarkConatiner = styled.div`
  ${flexCenter}
  position: absolute;
  width: 100%;
  height: 100%;
`;

const DATE = styled.div`
  ${dateStyle}
`;

const TrackContainer = styled.div<TrackStyleProps>`
  ${trackAbsolute}
  ${DATE} {
    color: ${({ $isScheduled }) => ($isScheduled ? `#8f8f8f` : `#d7d7d7`)};
  }
`;

const TrackBorder = styled.div<BorderProps>`
  ${({ order }) => trackBorder(order)};
  position: relative;
  width: 8%;

  ${media.mobile} {
    width: 14.2%;
  }
`;

function Track({ day, order, schedules, color }: TrackProps) {
  const theDay = new Date(`${day}T23:59:59`);
  const date = format(theDay, 'dd');
  const weekday = format(theDay, 'EEEEE');
  const weekend = isSunday(theDay) ? 'SUN' : isSaturday(theDay) ? 'SAT' : '';
  const isScheduled = schedules.filter(
    (schedule: Schedule) => schedule.date === day,
  )[0];

  return (
    <TrackBorder order={order}>
      <TrackContainer $isScheduled={isScheduled}>
        <WeekBack $weekend={weekend}>{weekday}</WeekBack>
        <DATE>{date}</DATE>
        <MarkConatiner>
          {isScheduled ? (
            <Mark schedule={isScheduled} color={color} />
          ) : (
            <Slash />
          )}
        </MarkConatiner>
      </TrackContainer>
    </TrackBorder>
  );
}

export default Track;
