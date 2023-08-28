import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../Pic';
import Track from './Track';
import Tags from '../Tags';
import ExternalLink from '../ExternalLink';
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

const Container = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const LinkTracker = styled(Link)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  ${postContainer}
  position: relative;
`;

function Tracker({ tracker }: TrackerProps) {
  const { user, text, created_at, schedules, url, tags } = tracker;
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
      <LinkTracker to={`/tracker/${tracker._id}`} />
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <Container>
        <User to={`/profile/${user.profileId}`}>
          {user.name}
          <span>@{user.profileId}</span>
        </User>
        <TEXT>{text}</TEXT>
        <TRACKS>{makeTracks}</TRACKS>
        {url && <ExternalLink link={url} />}
        <Tags tags={tags} />
      </Container>
    </Div>
  );
}

export default Tracker;
