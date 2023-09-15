import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMore, IoIosTrash } from 'react-icons/io';
import Pic from '../../components/Pic';
import styled, { css } from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { circle, flexCenter, hoverButton } from '../../styles/Mixin';
import { Name, ProfileId } from '../../styles/Tracker';

interface UserProps {
  path: string;
  tracker: any;
  isSignedUser: boolean;
  handleDelete: any;
}

interface StyleProps {
  $isOpen: boolean;
}

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const DelButton = styled.button`
  ${flexCenter}
  ${hoverButton(`${colorAll.light.red}`)}
  color: ${colorAll.light.red};
  font-size: 1rem;
  padding: 5px 10px;
  svg {
    font-size: 1.3rem;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #ffffff;
  border-radius: 5px;
  z-index: 51;
`;

const Icon = styled.div<StyleProps>`
  ${circle(35)}
  font-size: 1.5rem;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      background-color: ${colorAll.line};
    `};

  &:hover {
    cursor: pointer;
    background-color: ${colorAll.line};
  }
`;

const Dots = styled.div`
  position: relative;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  font-family: ${fontAll.main};

  ${Name},
  ${ProfileId} {
    border-bottom: 2px solid #ffffff;

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${colorAll.line};
    }
  }

  ${ProfileId} {
    padding: 3px 0 0;
  }
`;

const BioBox = styled(Link)`
  display: flex;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
`;

function User(props: UserProps) {
  const { path, tracker, isSignedUser, handleDelete } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Div>
      <BioBox to={path}>
        <Pic emoji={tracker.user.emoji} color={tracker.user.color} size={60} />
        <UserBox>
          <Name>{tracker.user.name}</Name>
          <ProfileId size={0.9}>@{tracker.user.profileId}</ProfileId>
        </UserBox>
      </BioBox>
      {isSignedUser && (
        <Dots>
          <Icon onClick={() => setIsOpen(true)} $isOpen={isOpen}>
            <IoIosMore />
          </Icon>
          {isOpen && (
            <>
              <Back onClick={() => setIsOpen(false)} />
              <Modal>
                <DelButton onClick={() => handleDelete(tracker._id)}>
                  <IoIosTrash />
                  DELETE
                </DelButton>
              </Modal>
            </>
          )}
        </Dots>
      )}
    </Div>
  );
}

export default User;
