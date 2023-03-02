import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineSmile,
  AiFillSmile,
  AiOutlineSetting,
  AiOutlineHome,
  AiFillHome,
  AiFillSetting,
} from 'react-icons/ai';
import styled from 'styled-components';
import { media, highlighter } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';

const Text = styled.span`
  padding: 0 5px;
  ${media.mobile} {
    display: none;
  }
`;

const LINK = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-family: ${fontAll.logo};
  svg {
    font-size: 1.5rem;
  }

  &:hover {
    ${highlighter(`${colorAll.red}`)}
    svg, span {
      color: ${colorAll.black};
    }
  }

  &.active {
    color: ${colorAll.red};
    &:hover {
      background: none;
      svg,
      span {
        color: ${colorAll.red};
      }
    }
  }
`;

const NAV = styled.nav`
  grid-area: nav;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 1.3rem;

  li {
    margin: 10px;
    max-width: 150px;
  }

  ${media.mobile} {
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    font-size: 2.5rem;
    border-top: 1px solid ${colorAll.light.line};
    background-color: ${colorAll.white};
  }
`;

function Nav() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);

  return (
    <NAV>
      <li>
        <LINK to={'/home'}>
          {({ isActive }) => (
            <>
              {isActive ? <AiFillHome /> : <AiOutlineHome />}
              <Text>HOME</Text>
            </>
          )}
        </LINK>
      </li>
      <li>
        <LINK to={`/profile/${signInUser?.profileId}`}>
          {({ isActive }) => (
            <>
              {isActive ? <AiFillSmile /> : <AiOutlineSmile />}
              <Text>PROFILE</Text>
            </>
          )}
        </LINK>
      </li>
      <li>
        <LINK to={'/setting'}>
          {({ isActive }) => (
            <>
              {isActive ? <AiFillSetting /> : <AiOutlineSetting />}
              <Text>SETTING</Text>
            </>
          )}
        </LINK>
      </li>
    </NAV>
  );
}

export default Nav;
