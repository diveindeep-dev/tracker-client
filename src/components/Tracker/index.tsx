import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../Pic';
import Tracks from './Tracks';
import Tags from '../Tags';
import styled from 'styled-components';
import { postContainer } from '../../styles/Mixin';
import { colorAll } from '../../styles/Variables';
import { Name, ProfileId, TrackerTitle } from '../../styles/Tracker';

interface TrackerProps {
  tracker: Tracker;
}

const UserBox = styled.div`
  display: flex;
  padding: 8px 0;
  div {
    display: flex;
    align-items: center;
  }
`;

const UserLink = styled(Link)`
  display: flex;
  position: relative;
  z-index: 11;
  padding-bottom: 2px;

  &:hover {
    padding-bottom: 0px;
    border-bottom: 2px solid ${colorAll.line};
  }
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
  &:hover {
    background-color: #d6d6d620;
  }
`;

const Div = styled.div`
  ${postContainer}
  position: relative;
`;

function Tracker({ tracker }: TrackerProps) {
  const { user, text, created_at, schedules, tags } = tracker;

  return (
    <Div>
      <LinkTracker to={`/tracker/${tracker._id}`} />
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <Container>
        <UserBox>
          <UserLink to={`/profile/${user.profileId}`}>
            <Name>{user.name}</Name>
            <ProfileId>@{user.profileId}</ProfileId>
          </UserLink>
        </UserBox>
        <TrackerTitle>{text}</TrackerTitle>
        <Tracks
          startDate={created_at}
          color={user.color}
          schedules={schedules}
        />
        <Tags tags={tags} />
      </Container>
    </Div>
  );
}

export default Tracker;
