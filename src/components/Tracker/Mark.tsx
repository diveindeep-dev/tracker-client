import React from 'react';
import { isBefore } from 'date-fns';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import styled from 'styled-components';
import { colorAll } from '../../styles/Variables';
import { flexCenter, media } from '../../styles/Mixin';

interface MarkProps {
  schedule: Schedule;
  color: string;
}

interface StyleProps {
  color?: string;
  $isMark?: boolean;
}

const MARK = styled.div<StyleProps>`
  ${flexCenter}
  width: 100%;
  height: 100%;
  font-size: clamp(1.7rem, calc(100vw / 35), 2.7rem);
  color: ${({ color }) => `${color}`};
  ${({ $isMark }) =>
    $isMark && `background-color: rgba( 255, 255, 255, 0.7 );`};

  ${media.mobile} {
    font-size: clamp(2rem, calc(100vw / 15), 5rem);
  }
`;

function Mark({ schedule, color }: MarkProps) {
  const theDay = new Date(`${schedule.date}T23:59:59`);
  const today = new Date();
  const mark = schedule.isDone ? (
    <BsCheckCircle />
  ) : (
    isBefore(theDay, today) && <BsXCircle />
  );

  const isMark = mark ? true : false;
  const markColor = schedule.isDone ? color : `${colorAll.light.grey}`;

  return (
    <MARK $isMark={isMark} color={markColor}>
      {mark}
    </MARK>
  );
}

export default Mark;
