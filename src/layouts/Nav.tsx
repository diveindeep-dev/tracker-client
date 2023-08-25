import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styled from 'styled-components';
import { media } from '../styles/Mixin';
import { colorAll, fontAll } from '../styles/Variables';
import {
  AiOutlineSetting,
  AiOutlineHome,
  AiFillHome,
  AiFillSetting,
} from 'react-icons/ai';
import { BsEmojiNeutral, BsFillEmojiSmileFill } from 'react-icons/bs';

const LogoWrap = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

const ActiveLink = styled(NavLink)`
  padding: 10px;
  margin: 10px;
  font-size: 1.3rem;
  font-family: ${fontAll.logo};
  border-radius: 10px;
  span {
    padding: 0 10px;
  }

  &:hover {
    background-color: ${colorAll.line};
  }

  &.active {
    svg {
      color: ${colorAll.main};
    }
    &:hover {
      background: none;
    }
  }

  ${media.mobile} {
    font-size: 1.5rem;

    span {
      display: none;
    }
  }
`;

const NAV = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  ${media.mobile} {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
`;

const Div = styled.div`
  grid-area: nav;
  position: sticky;
  top: 0;
  height: 100vh;
  border-right: 1px solid ${colorAll.line};

  ${media.mobile} {
    border-top: 1px solid ${colorAll.line};
    border-right: 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
  }
`;

function Nav() {
  return (
    <Div>
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <NAV>
        <ActiveLink to={`/home`}>
          {({ isActive }) => (
            <div>
              {isActive ? <AiFillHome /> : <AiOutlineHome />}
              <span>HOME</span>
            </div>
          )}
        </ActiveLink>
        <ActiveLink to={`/profile`}>
          {({ isActive }) => (
            <div>
              {isActive ? <BsFillEmojiSmileFill /> : <BsEmojiNeutral />}
              <span>PROFILE</span>
            </div>
          )}
        </ActiveLink>
        <ActiveLink to={`/setting`}>
          {({ isActive }) => (
            <div>
              {isActive ? <AiFillSetting /> : <AiOutlineSetting />}
              <span>SETTING</span>
            </div>
          )}
        </ActiveLink>
      </NAV>
    </Div>
  );
}

export default Nav;
