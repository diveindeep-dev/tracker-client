import React from 'react';
import { Link } from 'react-router-dom';
import Pic from '../../components/Pic';
import styled from 'styled-components';
import { circle, hoverButton } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

interface BioProps {
  paramsBio: User;
  isSignedUser: boolean;
}

interface StyleProps {
  color: string;
}

const Name = styled.div`
  padding: 0 5px 0 15px;
  font-size: 1.5rem;
  line-height: 0.8;
`;

const Id = styled.div`
  color: ${colorAll.grey};
  font-size: 0.8rem;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  font-family: ${fontAll.main};
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
  top: 75px;
  left: 20px;
  border: 2px solid ${colorAll.light.line};
`;

const Back = styled.div<StyleProps>`
  height: 150px;
  background-color: ${(props) => props.color};
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 1px solid ${colorAll.light.line};
`;

function Bio({ paramsBio, isSignedUser }: BioProps) {
  const { color, emoji, name, profileId } = paramsBio;

  return (
    <Div>
      <Back color={`${color}`} />
      <PicWrap>
        <Pic emoji={emoji} color={`${colorAll.white}`} size={[150]} />
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
          <Name>{name}</Name>
          <Id>@{profileId}</Id>
        </Container>
      </Detail>
    </Div>
  );
}

export default Bio;
