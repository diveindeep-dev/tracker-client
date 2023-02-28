import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../features/auth/slice';
import Pic from '../components/Pic';
import styled from 'styled-components';
import { flexCenter, hoverButton } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';

const Logo = styled(Link)`
  ${flexCenter}
  font-size: 2rem;
  font-family: ${fontAll.logo};
`;

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

  a {
    padding: 5px 10px;
    margin: 0 5px;
  }
`;

const HEADER = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 1.2rem;
  border-bottom: 1px solid ${colorAll.light.line};
`;

function Header() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispath = useDispatch<AppDispatch>();

  return (
    <HEADER>
      <Logo to={`/`}>TRACKER</Logo>
      <Auth>
        {signInUser ? (
          <>
            <Pic emoji={signInUser.emoji} color={signInUser.color} size={30} />
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
