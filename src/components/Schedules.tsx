import React from 'react';
import { Link } from 'react-router-dom';
import { isPast, isToday } from 'date-fns';
import { HiArrowUpRight } from 'react-icons/hi2';
import styled, { css } from 'styled-components';
import { hoverButton } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';
import Heart from './Heart';

interface ScheduleProps {
  schedules: ScheduleFull[];
  isSignedUser: boolean;
  handleDone: (id: string) => Promise<void>;
  isTag?: boolean;
}

interface StyleProps {
  $isDone?: boolean;
  color?: string;
}

const Text = styled.div<StyleProps>`
  font-family: ${fontAll.body};
  ${({ $isDone }) =>
    $isDone &&
    css`
      text-decoration: line-through;
      color: ${colorAll.light.grey};
    `};
`;

const Status = styled.div<StyleProps>`
  padding: 3px 5px;
  margin: 0 12px;
  font-size: 0.8rem;
  font-family: ${fontAll.logo};
  border: 1px solid ${({ color }) => color};
  border-radius: 5px;
  color: ${({ color }) => color};
`;

const LINK = styled(Link)`
  margin-left: 10px;
  font-size: 0.8rem;
  color: ${colorAll.light.grey};
  &:hover {
    color: ${colorAll.light.red};
  }
`;

const Button = styled.button<StyleProps>`
  margin: 0 5px;
  padding: 2px 10px;
  ${({ $isDone }) =>
    hoverButton($isDone ? `${colorAll.light.grey}` : `${colorAll.light.red}`)}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SCHEDULE = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

function Schedules(props: ScheduleProps) {
  const { schedules, isSignedUser, handleDone, isTag = false } = props;

  const scheduleList = schedules.map((schedule: ScheduleFull, i: number) => {
    const { _id, tracker, isDone, date } = schedule;
    const theDate = new Date(`${date}T23:59:59`);
    const toggleButtonText = isDone ? 'UNDO' : 'DONE';

    const status = isDone
      ? 'COMPLETED'
      : isPast(theDate)
      ? 'EXPIRED'
      : isToday(theDate) && 'TODAY';

    const color =
      status === 'COMPLETED'
        ? `${colorAll.light.blue}`
        : status === 'EXPIRED'
        ? `${colorAll.light.grey}`
        : `${colorAll.light.red}`;

    return (
      <SCHEDULE key={i}>
        <TitleContainer>
          <Text $isDone={isDone}>{tracker ? tracker.text : date}</Text>
          {tracker && (
            <LINK to={`/tracker/${tracker._id}`}>
              <HiArrowUpRight />
            </LINK>
          )}
          {isTag && status && <Status color={color}>{status}</Status>}
        </TitleContainer>
        <Container>
          {isSignedUser && isToday(theDate) && (
            <Button onClick={() => handleDone(_id)} $isDone={isDone}>
              {toggleButtonText}
            </Button>
          )}
          <Heart />
        </Container>
      </SCHEDULE>
    );
  });

  return <div>{scheduleList}</div>;
}

export default Schedules;
