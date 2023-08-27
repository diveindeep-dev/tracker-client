import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLink } from 'react-icons/ai';
import Pic from '../Pic';
import Track from './Track';
import { make2week } from '../../utils';
import styled from 'styled-components';
import { TRACKS } from '../../styles/Track';
import { postContainer } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

interface TrackerProps {
  tracker: Tracker;
}

const User = styled(Link)`
  position: relative;
  z-index: 11;
  padding: 0 5px 0 1px;
  font-family: ${fontAll.main};

  span {
    padding-left: 5px;
    font-size: 0.8rem;
    color: ${colorAll.light.grey};
  }
  &:hover {
    border-bottom: 1px solid ${colorAll.light.grey};
  }
`;

const TEXT = styled.div`
  font-family: ${fontAll.body};
  font-size: 1.3rem;
  padding: 8px 0;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Tag = styled.div`
  font-family: ${fontAll.body};
  font-size: 0.8rem;
  margin: 5px 5px 0 0;
  border-radius: 20px;
  padding: 5px 10px 4px;
  background-color: ${colorAll.line};
`;

const A = styled.a`
  width: 100%;
  color: ${colorAll.blue};
  font-size: 0.8rem;
  font-family: ${fontAll.body};
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const Url = styled.div`
  position: relative;
  z-index: 11;
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  color: ${colorAll.blue};
  svg {
    margin-right: 3px;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const Div = styled.div`
  ${postContainer}
`;

function Tracker({ tracker }: TrackerProps) {
  const { user, text, created_at, schedules, url, tags } = tracker;
  const urlLink = url?.slice(0, 4) === 'http' ? url : `https://${url}`;
  const weekFromCratedDay = make2week(created_at);
  const makeTracks = weekFromCratedDay.map((day, i) => {
    return (
      <Track
        key={i}
        day={day}
        order={i}
        schedules={schedules}
        color={user.color}
      />
    );
  });

  return (
    <Div>
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <Container>
        <User to={`/profile/${user.profileId}`}>
          {user.name}
          <span>@{user.profileId}</span>
        </User>
        <TEXT>{text}</TEXT>
        <TRACKS>{makeTracks}</TRACKS>
        {url && (
          <Url>
            <AiOutlineLink />
            <A href={urlLink}>{url}</A>
          </Url>
        )}
        <Tags>
          {tags.map((tag: string, i: number) => (
            <Tag key={i}>#{tag}</Tag>
          ))}
        </Tags>
      </Container>
    </Div>
  );
}

export default Tracker;
