import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosMore, IoIosTrash } from 'react-icons/io';
import {
  getTrackerByIdApi,
  removeTrackerApi,
} from '../../features/tracker/api';
import { cheerApi, toggleDoneApi } from '../../features/user/api';
import Pic from '../../components/Pic';
import Tracks from '../../components/Tracker/Tracks';
import Schedules from '../../components/Schedules';
import Tags from '../../components/Tags';
import ExternalLink from '../../components/ExternalLink';
import Details from './Details';
import styled, { css } from 'styled-components';
import { EmptyBox, circle, flexCenter, hoverButton } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

interface StyleProps {
  $isOpen: boolean;
}

const DetailTracks = styled.div`
  padding: 30px;
`;

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

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const DelButton = styled.button`
  ${flexCenter}
  ${hoverButton(`${colorAll.light.red}`)}
  color: ${colorAll.light.red};
  font-size: 1rem;
  padding: 5px 10px;
  svg {
    font-size: 1.3rem;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  z-index: 51;
`;

const Icon = styled.div<StyleProps>`
  ${circle(35)}
  font-size: 1.5rem;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      background-color: ${colorAll.line};
    `};

  &:hover {
    cursor: pointer;
    background-color: ${colorAll.line};
  }
`;

const Dots = styled.div`
  position: relative;
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
  padding: 20px 15px;
  h2 {
    padding: 0 5px;
    font-family: ${fontAll.logo};
  }
`;

function Tracker() {
  const { trackerId } = useParams();
  const navigate = useNavigate();
  const signedId = useSelector((state: State) => state.auth.signInUser?._id);
  const [tracker, setTracker] = useState<Tracker>();
  const [isSignedUser, setIsSignedUser] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    if (status === 200) {
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
            {isSignedUser && (
              <Dots>
                <Icon onClick={() => setIsOpen(true)} $isOpen={isOpen}>
                  <IoIosMore />
                </Icon>
                {isOpen && (
                  <>
                    <Back onClick={() => setIsOpen(false)} />
                    <Modal>
                      <DelButton onClick={() => handleDelete(tracker._id)}>
                        <IoIosTrash />
                        DELETE
                      </DelButton>
                    </Modal>
                  </>
                )}
              </Dots>
            )}
          </User>
          <Text>{tracker.text}</Text>
          <Tracks
            startDate={tracker.created_at}
            color={tracker.user.color}
            schedules={tracker.schedules}
          />
          {tracker.url && <ExternalLink link={tracker.url} />}
          <Tags tags={tracker.tags} />
          <Detail>
            <Details cheers={tracker.cheers} signedId={signedId} />
            <DetailTracks>
              <h3>All Tracks</h3>
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
