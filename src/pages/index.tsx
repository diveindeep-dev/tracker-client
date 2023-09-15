import React, { useEffect, useState } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import NewTracker from '../components/Tracker/New';
import {
  fakeHandle,
  guestBio,
  guestSchedules,
  guestSingleTracker,
} from '../config/guestData';
import { getRandomColor, getRandomEmoji } from '../utils/random';
import Pic from '../components/Pic';
import Bio from './profile/Bio';
import Tracks from '../components/Tracker/Tracks';
import Details from './tracker/Details';
import styled from 'styled-components';
import { Text } from '../components/Schedules';
import { colorAll, fontAll } from '../styles/Variables';
import { flexCenter, media } from '../styles/Mixin';
import { Name, ProfileId, Tag } from '../styles/Tracker';
import Mobile from '../styles/assets/mobile.png';
import Desktop from '../styles/assets/desktop.png';

const Img = styled.img`
  width: ${({ width }) => (width ? `${width}px` : `500px`)};
  height: 100%;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const Set = styled.div`
  ${flexCenter}
  flex-direction: column;
  height: 100%;

  ${User} {
    align-items: center;
    padding: 15px 0 10px;
  }
`;

const Figure = styled.div`
  position: absolute;
  box-shadow: -2px -2px 10px 0px ${colorAll.line};
`;

const TrackerUser = styled.div`
  display: flex;
  padding: 20px 0;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ${ProfileId} {
    padding: 3px 0;
  }
`;

const Tags = styled.div`
  display: flex;
  padding: 10px 0;
`;

const TrackerList = styled.div`
  padding: 20px 20px;
  div {
    display: flex;
    align-items: center;
    margin: 10px;
    svg {
      color: ${colorAll.light.grey};
    }
  }
`;

const Imgs = styled.div`
  display: flex;
  position: absolute;
  right: -50px;
  bottom: -80px;

  ${media.mobile} {
    right: -200px;
    bottom: -50px;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 250px;
  padding: 20px;
  margin: 20px;
  overflow: hidden;
  border: 1px solid ${colorAll.line};
  p {
    padding: 10px 0;
  }

  ${media.mobile} {
    height: 300px;
  }
`;

const ContainerLink = styled(Link)`
  display: flex;
  position: relative;
  height: 250px;
  padding: 20px;
  margin: 20px;
  overflow: hidden;
  border: 1px solid ${colorAll.line};
  p {
    padding: 10px 0;
  }

  ${media.mobile} {
    height: 300px;
  }

  &:hover {
    background-color: #f7fcfd;

    h2 {
      color: ${colorAll.main};
    }
  }
`;

const ContainerHome = styled(ContainerLink)`
  ${Figure} {
    position: absolute;
    width: 90%;
    transform: rotate(-10deg);
    right: -150px;
    bottom: -120px;
    z-index: 100;
    background-color: #ffffff;

    ${media.mobile} {
      right: -60px;
      bottom: -150px;
    }
  }
`;

const ContainerProfile = styled(ContainerLink)`
  ${Figure} {
    scale: 80%;
    width: 70%;
    transform: rotate(20deg);
    right: -170px;
    bottom: -170px;
    background-color: #ffffff;
  }

  ${media.mobile} {
    ${Figure} {
      width: 60%;
      right: -70px;
      bottom: -120px;
    }
  }
`;

const ContainerSetting = styled(ContainerLink)`
  justify-content: space-between;
  ${Figure} {
    position: inherit;
    padding: 0 50px;
    box-shadow: none;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;

const ContainerTracker = styled(ContainerLink)`
  justify-content: space-between;

  ${Figure} {
    width: 100%;
    height: 100%;
    right: -320px;
    top: 20px;
    padding: 0px 20px;
    background-color: #ffffff;

    ${Text} {
      font-size: 1.3rem;
      padding-bottom: 5px;
    }
  }
  ${media.mobile} {
    flex-direction: column;
    ${Figure} {
      top: 85px;
      right: 0;
      scale: 90%;
    }
  }
`;

const Title = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: 20px 0;
  h1 {
    font-size: 3rem;
    padding: 20px 0;
  }
`;

const Div = styled.div`
  font-family: ${fontAll.body};
`;

function Index() {
  const [color, setColor] = useState(guestBio.color);
  const [emoji, setEmoji] = useState(guestBio.emoji);

  useEffect(() => {
    const changeColor = setInterval(() => {
      setColor(getRandomColor());
      setEmoji(getRandomEmoji());
    }, 1500);

    return () => {
      clearInterval(changeColor);
    };
  }, []);

  return (
    <Div>
      <Title>
        <h1>TRACKER</h1>
        <p>2주 동안 지키고 싶은 자신과의 약속을 기록해보세요.</p>
        <p>각 설명 페이지는 로그인없이 체험해 보실 수 있습니다.</p>
      </Title>
      <ContainerHome to={`/home`}>
        <div>
          <h2>HOME</h2>
          <p>
            오늘부터 시작하는 새로운 TRACKER를 만들고,
            <br />
            다른 유저의 TRACKER를 볼 수 있습니다.
          </p>
        </div>
        <Figure>
          <NewTracker setTrue={fakeHandle} />
        </Figure>
      </ContainerHome>
      <ContainerProfile to={`/profile`}>
        <div>
          <h2>PROFILE</h2>
          <p>
            유저 개인 페이지입니다.
            <br />
            오늘 계획된 TRACK을 관리하고
            <br />
            전체 TRACKER를 볼 수 있습니다.
          </p>
        </div>
        <Figure>
          <Bio bio={guestBio} isSignedUser={false} />
          <TrackerList>
            <h3>Today</h3>
            {guestSchedules.map((schedule, i) => {
              return (
                <div key={i}>
                  <Text $isDone={schedule.isDone}>{schedule.tracker.text}</Text>
                  <HiArrowUpRight />
                </div>
              );
            })}
          </TrackerList>
        </Figure>
      </ContainerProfile>
      <ContainerSetting to={`/setting`}>
        <div>
          <h2>SETTING</h2>
          <p>나만의 프로필을 관리할 수 있습니다.</p>
        </div>
        <Figure>
          <Set>
            <Pic emoji={emoji} color={color} size={130} />
            <User>
              <Name>{guestBio.name}</Name>
              <ProfileId>@{guestBio.profileId}</ProfileId>
            </User>
          </Set>
        </Figure>
      </ContainerSetting>
      <ContainerTracker to={`/tracker`}>
        <div>
          <h2>TRACKER</h2>
          <p>선택된 트래커를 자세히 볼 수 있습니다.</p>
        </div>
        <Figure>
          <TrackerUser>
            <Pic emoji={guestBio.emoji} color={guestBio.color} size={60} />
            <User>
              <Name size={1.2}>{guestBio.name}</Name>
              <ProfileId>@{guestBio.profileId}</ProfileId>
            </User>
          </TrackerUser>
          <Text>{guestSingleTracker.text}</Text>
          <Tracks
            startDate={guestSingleTracker.created_at}
            color={guestSingleTracker.user.color}
            schedules={guestSingleTracker.schedules}
          />
          <Tags>
            {guestSingleTracker.tags.map((tag, i) => {
              return <Tag key={i}># {tag.text}</Tag>;
            })}
          </Tags>
          <Details
            cheers={guestSingleTracker.cheers}
            signedId={'guest'}
            count={1}
          />
        </Figure>
      </ContainerTracker>
      <Container>
        <div>
          <h2>Responsive Web</h2>
          <p>데스크탑과 모바일, 테블릿까지 편리하게 이용할 수 있습니다.</p>
        </div>
        <Imgs>
          <Img src={Mobile} alt="mobile" width={100} />
          <Img src={Desktop} alt="dektop" width={400} />
        </Imgs>
      </Container>
    </Div>
  );
}

export default Index;
