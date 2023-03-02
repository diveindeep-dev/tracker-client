import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../features/auth/slice';
import Pic from '../components/Pic';
import Logo from './Logo';
import styled from 'styled-components';
import { hoverButton, media } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';

const Logout = styled.button`
  padding: 0 10px;
  font-size: 1.2rem;
  ${hoverButton(`${colorAll.grey}`)}
`;

const Name = styled.div`
  padding: 0 10px;
  font-family: ${fontAll.logo};
`;

const Signin = styled(Link)`
  ${hoverButton(`${colorAll.black}`)}
`;

const Signup = styled(Link)`
  ${hoverButton(`${colorAll.red}`)}
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrap = styled.div`
  display: none;

  ${media.mobile} {
    display: flex;
  }
`;

const HEADER = styled.header`
  grid-area: header;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  font-size: 1.2rem;
  border-bottom: 1px solid ${colorAll.light.line};

  a {
    padding: 5px 10px;
    margin: 0 5px;
  }

  ${media.mobile} {
    justify-content: space-between;
    padding: 0 10px;
  }
`;

function Header() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispath = useDispatch<AppDispatch>();

  return (
    <HEADER>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <Auth>
        {signInUser ? (
          <>
            <Pic
              emoji={signInUser.emoji}
              color={signInUser.color}
              size={[30, 30]}
            />
            <Name>{signInUser.name}</Name>
            <Logout onClick={() => dispath(signOut())}>Logout</Logout>
          </>
        ) : (
          <>
            <Signup to={'/signup'}>Sign Up</Signup>
            <Signin to={'/signin'}>Sign In</Signin>
          </>
        )}
      </Auth>
    </HEADER>
  );
}

export default Header;
