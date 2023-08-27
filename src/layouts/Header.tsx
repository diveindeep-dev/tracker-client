import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../features/auth/slice';
import Logo from './Logo';
import Pic from '../components/Pic';
import styled from 'styled-components';
import { flexCenter, hoverButton, media } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';

const LogoWrap = styled.div`
  display: none;

  ${media.mobile} {
    display: flex;
  }
`;

const Name = styled.div`
  padding: 0 10px;
  font-family: ${fontAll.logo};
`;

const SettingLink = styled(Link)`
  ${flexCenter}
`;

const Logout = styled.button`
  ${hoverButton(`${colorAll.light.grey}`)}
  padding: 5px 10px;
  margin: 0 5px;
  line-height: 1;
  font-size: 1rem;
`;

const Signin = styled(Link)`
  ${hoverButton(`${colorAll.light.grey}`)}
  padding: 5px 10px;
  margin: 0 5px;
`;

const Signup = styled(Link)`
  ${hoverButton(`${colorAll.main}`)}
  padding: 5px 10px;
  margin: 0 5px;
`;

const AuthContainer = styled.div`
  ${flexCenter}
`;

const HEADER = styled.header`
  grid-area: header;
  display: flex;
  justify-content: flex-end;
  height: 80px;
  padding: 0 10px;
  border-bottom: 1px solid ${colorAll.line};

  ${media.mobile} {
    justify-content: space-between;
  }
`;

function Header() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <HEADER>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <AuthContainer>
        {signInUser ? (
          <>
            <SettingLink to={'/setting'}>
              <Pic
                emoji={signInUser.emoji}
                color={signInUser.color}
                size={30}
              />
              <Name>{signInUser.name}</Name>
            </SettingLink>
            <Logout onClick={() => dispatch(signOut())}>Log Out</Logout>
          </>
        ) : (
          <>
            <Signup to={`/signup`}>Sign Up</Signup>
            <Signin to={`/signin`}>Sign In</Signin>
          </>
        )}
      </AuthContainer>
    </HEADER>
  );
}

export default Header;
