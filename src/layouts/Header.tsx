import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../features/auth/slice';
import Logo from './Logo';
import styled from 'styled-components';
import { flexCenter, hoverButton, media } from '../styles/Mixin';
import { colorAll } from '../styles/Variables';

const LogoWrap = styled.div`
  display: none;

  ${media.mobile} {
    display: flex;
  }
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
            <div>{signInUser.name}</div>
            <button onClick={() => dispatch(signOut())}>Logout</button>
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
