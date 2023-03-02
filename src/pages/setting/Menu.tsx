import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  CgRename,
  CgSmile,
  CgColorPicker,
  CgChevronRight,
} from 'react-icons/cg';
import styled from 'styled-components';
import { colorAll } from '../../styles/Variables';

interface SettingMenuProps {
  handleMenu: Dispatch<SetStateAction<string>>;
  mode: string;
}

const MenuLabel = styled.label`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colorAll.light.line};
  div {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    svg {
      font-size: 1.2rem;
      margin-right: 5px;
    }
  }

  &:hover {
    background-color: ${colorAll.light.line};
    border-right: 3px solid ${colorAll.light.line};
    cursor: pointer;
  }
`;

const InvisibleInput = styled.input`
  display: none;
  &:checked + ${MenuLabel} {
    background-color: ${colorAll.light.line};
    border-right: 3px solid ${colorAll.red};
  }
`;

const Menu = styled.div`
  grid-area: list;
  display: flex;
  flex-direction: column;
`;

function SettingMenu({ handleMenu, mode }: SettingMenuProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMenu(e.target.value);
  };

  return (
    <Menu>
      <InvisibleInput
        type="radio"
        id="NAME"
        name="edit"
        value="NAME"
        checked={mode === 'NAME'}
        onChange={handleChange}
      />
      <MenuLabel htmlFor="NAME">
        <div>
          <CgRename />
          NAME
        </div>
        <CgChevronRight />
      </MenuLabel>
      <InvisibleInput
        type="radio"
        id="EMOJI"
        name="edit"
        value="EMOJI"
        checked={mode === 'EMOJI'}
        onChange={handleChange}
      />
      <MenuLabel htmlFor="EMOJI">
        <div>
          <CgSmile />
          EMOJI
        </div>
        <CgChevronRight />
      </MenuLabel>
      <InvisibleInput
        type="radio"
        id="COLOR"
        name="edit"
        value="COLOR"
        checked={mode === 'COLOR'}
        onChange={handleChange}
      />
      <MenuLabel htmlFor="COLOR">
        <div>
          <CgColorPicker />
          COLOR
        </div>
        <CgChevronRight />
      </MenuLabel>
    </Menu>
  );
}

export default SettingMenu;
