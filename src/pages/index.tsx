import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colorAll, fontAll } from '../styles/Variables';
import { flexCenter, media } from '../styles/Mixin';
import { Link } from 'react-router-dom';
import NewTracker from '../components/Tracker/New';
import Today from './profile/Today';
import {
  fakeHandle,
  guestBio,
  guestSchedules,
  guestSingleTracker,
} from '../config/guestData';
import { getRandomColor, getRandomEmoji } from '../utils/random';
import Pic from '../components/Pic';
import Bio from './profile/Bio';
import User from './tracker/User';
import Tracks from '../components/Tracker/Tracks';
import Tags from '../components/Tags';
import Details from './tracker/Details';

const Name = styled.div`
  padding: 15px 0 5px;
  font-family: ${fontAll.main};
  font-size: 1.2rem;
`;

const Id = styled.div`
  color: ${colorAll.light.grey};
  font-family: ${fontAll.main};
  font-size: 0.9rem;
`;

const Set = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const Figure = styled.div`
  position: absolute;
  box-shadow: -2px -2px 10px 0px ${colorAll.line};
`;

const Sub = styled.div`
  font-size: 2rem;
  font-family: ${fontAll.logo};
`;

const Container = styled.div`
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

    ${Sub} {
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
    font-family: ${fontAll.logo};
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
          <Sub>HOME</Sub>
          <p>
            오늘부터 시작하는 새로운 TRACKER를 만들고,
            <br />
            다른 유저의 TRACKER를 볼 수 있습니다.
          </p>
        </div>
        <Figure>
          <NewTracker setReload={() => false} />
        </Figure>
      </ContainerHome>
      <ContainerProfile to={`/profile`}>
        <div>
          <Sub>PROFILE</Sub>
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
          <Today
            schedules={guestSchedules}
            isSignedUser={false}
            handleCheer={fakeHandle}
            handleDone={fakeHandle}
            isSample={true}
          />
        </Figure>
      </ContainerProfile>
      <ContainerSetting to={`/setting`}>
        <div>
          <Sub>SETTING</Sub>
          <p>나만의 프로필을 관리할 수 있습니다.</p>
        </div>
        <Figure>
          <Set>
            <Pic emoji={emoji} color={color} size={150} />
            <Name>{guestBio.name}</Name>
            <Id>@{guestBio.profileId}</Id>
          </Set>
        </Figure>
      </ContainerSetting>
      <ContainerTracker to={`/tracker`}>
        <div>
          <Sub>TRACKER</Sub>
          <p>선택된 트래커를 자세히 볼 수 있습니다.</p>
        </div>
        <Figure>
          <User
            path={`/profile`}
            tracker={guestSingleTracker}
            isSignedUser={true}
            handleDelete={() => {}}
          />
          <Tracks
            startDate={guestSingleTracker.created_at}
            color={guestSingleTracker.user.color}
            schedules={guestSingleTracker.schedules}
          />
          <Tags tags={guestSingleTracker.tags} />
          <Details
            cheers={guestSingleTracker.cheers}
            signedId={'guest'}
            count={1}
          />
        </Figure>
      </ContainerTracker>
      <Container>
        <div>
          <Sub>Responsive Web</Sub>
          <p>데스크탑과 모바일, 테블릿까지 편리하게 이용할 수 있습니다.</p>
        </div>
      </Container>
    </Div>
  );
}

export default Index;
