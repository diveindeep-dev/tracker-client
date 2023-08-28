import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { getTrackerById } from '../../features/tracker/api';
import { toggleDoneApi } from '../../features/user/api';
import Pic from '../../components/Pic';
import Track from '../../components/Tracker/Track';
import Schedules from '../../components/Schedules';
import Tags from '../../components/Tags';
import ExternalLink from '../../components/ExternalLink';
import { make2week } from '../../utils';
import styled from 'styled-components';
import { TRACKS } from '../../styles/Track';
import { flexCenter } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

const Detail = styled.div`
  padding: 30px 0;

  h3 {
    font-family: ${fontAll.logo};
    padding: 20px 0;
  }
`;

const Text = styled.div`
  padding: 10px 0;
  font-size: 1.5rem;
  font-family: ${fontAll.body};
`;

const Icon = styled.div`
  ${flexCenter}
  font-size: 1.3rem;
`;

const Name = styled.div`
  margin: 5px 0;
  border-bottom: 2px solid #ffffff;
  font-size: 1.2rem;
  line-height: 1;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${colorAll.light.grey};
  }
`;

const Id = styled.div`
  border-bottom: 2px solid #ffffff;
  color: ${colorAll.light.grey};
  font-size: 0.9rem;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${colorAll.light.grey};
  }
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  font-family: ${fontAll.main};
`;

const BioBox = styled(Link)`
  display: flex;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
`;

const Container = styled.div`
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  padding: 20px 15px;
  h2 {
    padding: 0 5px;
    font-family: ${fontAll.logo};
  }
`;

function Tracker() {
  const { trackerId } = useParams();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [tracker, setTracker] = useState<Tracker>();
  const [isSignedUser, setIsSignedUser] = useState<boolean>(false);

  useEffect(() => {
    if (trackerId) {
      const getTrackerInfo = async () => {
        const { status, data } = await getTrackerById(trackerId);
        if (status === 200) {
          setTracker(data.tracker);
          setIsSignedUser(data.tracker.user._id === signedId);
        }
      };
      getTrackerInfo();
    }
  }, [trackerId, signedId]);

  const handleDone = async (scheduleId: string) => {
    const { status, data } = await toggleDoneApi(scheduleId);
    if (status === 200) {
      setTracker(data.tracker);
    }
  };

  const weekFromCratedDay = make2week(tracker?.created_at);
  const makeTracks = weekFromCratedDay.map((day, i) => {
    return (
      <Track
        key={i}
        day={day}
        order={i}
        schedules={tracker?.schedules || []}
        color={tracker?.user.color}
      />
    );
  });

  return (
    <Div>
      <h2>Tracker</h2>
      {tracker ? (
        <Container>
          <User>
            <BioBox to={`/profile/${tracker.user.profileId}`}>
              <Pic
                emoji={tracker.user.emoji}
                color={tracker.user.color}
                size={60}
              />
              <UserText>
                <Name>{tracker.user.name}</Name>
                <Id>@{tracker.user.profileId}</Id>
              </UserText>
            </BioBox>
            <Icon>
              <IoIosMore />
            </Icon>
          </User>
          <Text>{tracker.text}</Text>
          <TRACKS>{makeTracks}</TRACKS>
          {tracker.url && <ExternalLink link={tracker.url} />}
          <Tags tags={tracker.tags} />
          <Detail>
            <div>
              <h3>All Tracks</h3>
              <Schedules
                schedules={tracker.schedules}
                isSignedUser={isSignedUser}
                handleDone={handleDone}
                isTag={true}
              />
            </div>
          </Detail>
        </Container>
      ) : (
        <div>존재하지 않는 Tracker입니다.</div>
      )}
    </Div>
  );
}

export default Tracker;
