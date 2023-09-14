import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getTrackerByIdApi,
  removeTrackerApi,
} from '../../features/tracker/api';
import { cheerApi, toggleDoneApi } from '../../features/user/api';
import User from './User';
import Details from './Details';
import Tracks from '../../components/Tracker/Tracks';
import Schedules from '../../components/Schedules';
import Tags from '../../components/Tags';
import ExternalLink from '../../components/ExternalLink';
import styled from 'styled-components';
import { EmptyBox, media } from '../../styles/Mixin';
import { fontAll } from '../../styles/Variables';

const DetailTracks = styled.div`
  padding: 30px;
  ${media.mobile} {
    padding: 20px;
  }
`;

const Detail = styled.div`
  padding: 30px 0;

  h3 {
    padding: 20px 0;
  }
`;

const Text = styled.div`
  padding: 10px 0;
  font-size: 1.5rem;
  font-family: ${fontAll.body};
`;

const Container = styled.div`
  padding: 20px 40px;
  ${media.mobile} {
    padding: 20px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

function Tracker() {
  const { trackerId } = useParams();
  const navigate = useNavigate();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [tracker, setTracker] = useState<Tracker>();
  const [isSignedUser, setIsSignedUser] = useState<boolean>(false);

  useEffect(() => {
    if (trackerId) {
      const getTrackerInfo = async () => {
        const result = await getTrackerByIdApi(trackerId);
        if (result) {
          if (result.status === 200) {
            setTracker(result.data.tracker);
            setIsSignedUser(result.data.tracker.user._id === signedId);
          }
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

  const handleDelete = async (trackerId: string) => {
    const { status } = await removeTrackerApi(trackerId);
    if (status === 204) {
      navigate('/home');
    }
  };

  const handleCheer = async (scheduleId: string) => {
    if (signedId) {
      const { status, data } = await cheerApi(scheduleId, signedId);
      if (status === 200) {
        setTracker(data.tracker);
      }
    }
  };

  return (
    <Div>
      {tracker ? (
        <Container>
          <User
            path={`/profile/${tracker.user.profileId}`}
            tracker={tracker}
            isSignedUser={isSignedUser}
            handleDelete={handleDelete}
          />
          <Text>{tracker.text}</Text>
          <Tracks
            startDate={tracker.created_at}
            color={tracker.user.color}
            schedules={tracker.schedules}
          />
          {tracker.url && <ExternalLink link={tracker.url} />}
          <Tags tags={tracker.tags} />
          <Detail>
            <Details
              cheers={tracker.cheers}
              signedId={signedId}
              retracker={{
                _id: tracker._id,
                text: tracker.text,
                user: tracker.user,
                tags: tracker.tags,
                url: tracker.url,
              }}
              count={
                tracker.schedules.map((schedule) => schedule.cheers).flat(1)
                  .length
              }
            />
            <DetailTracks>
              <h3>ALL TRACKS</h3>
              <Schedules
                schedules={tracker.schedules}
                isSignedUser={isSignedUser}
                handleDone={handleDone}
                handleCheer={handleCheer}
                isTag={true}
              />
            </DetailTracks>
          </Detail>
        </Container>
      ) : (
        <EmptyBox>존재하지 않는 Tracker입니다.</EmptyBox>
      )}
    </Div>
  );
}

export default Tracker;
