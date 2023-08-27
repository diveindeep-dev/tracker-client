import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  CgRename,
  CgSmile,
  CgColorPicker,
  CgChevronRight,
} from 'react-icons/cg';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';

interface MenuProps {
  handleMenu: Dispatch<SetStateAction<string>>;
  mode: string;
}

const MenuLabel = styled.label`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colorAll.line};
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
    background-color: ${colorAll.line};
    border-right: 3px solid ${colorAll.line};
    cursor: pointer;
  }
`;

const InvisibleInput = styled.input`
  display: none;
  &:checked + ${MenuLabel} {
    background-color: ${colorAll.line};
    border-right: 3px solid ${colorAll.main};
  }
`;

const Div = styled.div`
  grid-area: menu;
  display: flex;
  flex-direction: column;
  font-family: ${fontAll.main};
`;

function Menu({ handleMenu, mode }: MenuProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMenu(e.target.value);
  };

  return (
    <Div>
      <InvisibleInput
        type="radio"
        id="NAME"
        value="NAME"
        name="edit"
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
        value="EMOJI"
        name="edit"
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
        value="COLOR"
        name="edit"
        onChange={handleChange}
      />
      <MenuLabel htmlFor="COLOR">
        <div>
          <CgColorPicker />
          COLOR
        </div>
        <CgChevronRight />
      </MenuLabel>
    </Div>
  );
}

export default Menu;
