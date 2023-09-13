import React from 'react';
import styled from 'styled-components';
import Pic from '../../components/Pic';
import { colorAll, fontAll } from '../../styles/Variables';
import { Link } from 'react-router-dom';
import { getRandomColor, getRandomEmoji } from '../../utils/random';
import { circle, hoverButton, media } from '../../styles/Mixin';
import { Name, ProfileId } from '../../styles/Tracker';

interface BioProps {
  bio: Bio | null;
  isSignedUser: boolean;
}

interface StyleProps {
  color: string;
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 20px;
`;

const SettingLink = styled(Link)<StyleProps>`
  ${({ color }) => hoverButton(color)}
  padding: 5px 8px 4px;
  font-size: 0.7rem;
  font-family: ${fontAll.main};
`;

const WrapLink = styled.div`
  align-self: flex-end;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 30px;
  height: 140px;
`;

const PicWrap = styled.div`
  ${circle(154)}
  position: absolute;
  top: 73px;
  left: 20px;
  border: 2px solid ${colorAll.line};
  ${media.mobile} {
    ${circle(138)}
    top: 81px;
  }
`;

const Back = styled.div<StyleProps>`
  height: 150px;
  background-color: ${({ color }) => color};
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 1px solid ${colorAll.line};
`;

function Bio({ bio, isSignedUser }: BioProps) {
  const notExist: Bio = {
    profileId: 'null',
    name: 'null',
    color: getRandomColor(),
    emoji: getRandomEmoji(),
  };
  const user = bio || notExist;
  const { name, profileId, emoji, color } = user;

  return (
    <Div>
      <Back color={`${color}`} />
      <PicWrap>
        <Pic emoji={emoji} color={`#ffffff`} size={150} isHover={false} />
      </PicWrap>
      <Detail>
        <WrapLink>
          {isSignedUser && (
            <SettingLink to={`/setting`} color={color}>
              Edit Profile
            </SettingLink>
          )}
        </WrapLink>
        <Container>
          <Name size={1.5}>{name}</Name>
          <ProfileId size={0.9}>@{profileId}</ProfileId>
        </Container>
      </Detail>
    </Div>
  );
}

export default Bio;
