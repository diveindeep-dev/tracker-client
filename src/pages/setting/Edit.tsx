import React, { ChangeEvent, Fragment, Dispatch, SetStateAction } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { emojis } from '../../utils/random';
import { CgChevronRight } from 'react-icons/cg';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { media } from '../../styles/Mixin';

interface EditProps {
  mode: string;
  values: any;
  setValues: Dispatch<SetStateAction<any>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

const InvisibleInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1.1rem;
  font-family: ${fontAll.main};
  border: 1px solid ${colorAll.line};
  width: 100%;
`;

const Emoji = styled.label`
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
  }
  ${media.mobile} {
    font-size: 1.6rem;
  }
`;

const EmojiPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
  max-height: 400px;
  border: 1px solid ${colorAll.line};
  overflow-y: scroll;
  ${media.mobile} {
    max-height: 350px;
    ${Emoji} {
      font-family: 1.5rem;
    }
  }
`;

const Description = styled.div`
  padding: 10px 0;
  font-size: 0.9rem;
  font-family: ${fontAll.body};
`;

const EDIT = styled.div`
  width: 100%;
  padding: 10px;
  h2 {
    display: flex;
    align-items: center;
    color: ${colorAll.grey};
    font-family: ${fontAll.main};
    font-weight: 900;
    svg {
      margin-right: 5px;
      font-size: 1rem;
    }
  }
  .chrome-picker {
    width: 100% !important;
    box-shadow: none !important;
    border: 1px solid ${colorAll.line};
  }
  ${media.mobile} {
    padding: 5px;
  }
`;

function Edit(props: EditProps) {
  const { mode, values, handleChange, setValues, setDisabled, setError } =
    props;

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 10) {
      setDisabled(true);
      setError('최대 10자리까지 가능합니다.');
    } else {
      setValues({ ...values, name: value });
      setError('');
    }
  };

  const handleChangeColor = (color: ColorResult) => {
    setValues({ ...values, color: color.hex });
  };

  const edit = () => {
    switch (mode) {
      case 'NAME':
        return (
          <>
            <h2>
              <CgChevronRight />
              {mode}
            </h2>
            <Description>사용자 이름을 변경할 수 있습니다.</Description>
            <NameInput
              type="text"
              placeholder="새로운 이름"
              name="name"
              onChange={handleChangeName}
              value={values.name}
            />
          </>
        );
      case 'EMOJI':
        return (
          <>
            <h2>
              <CgChevronRight />
              {mode}
            </h2>
            <Description>사용자 이모지를 변경할 수 있습니다.</Description>
            <EmojiPicker onChange={handleChange}>
              {emojis.map((emoji, i) => {
                return (
                  <Fragment key={i}>
                    <InvisibleInput
                      type="radio"
                      id={emoji}
                      name="emoji"
                      value={emoji}
                    />
                    <Emoji htmlFor={emoji}>{emoji}</Emoji>
                  </Fragment>
                );
              })}
            </EmojiPicker>
          </>
        );
      case 'COLOR':
        return (
          <>
            <h2>
              <CgChevronRight />
              {mode}
            </h2>
            <Description>프로필 배경 색상을 변경할 수 있습니다.</Description>
            <ChromePicker
              disableAlpha={true}
              onChange={handleChangeColor}
              color={values.color}
            />
          </>
        );
      default:
        return (
          <Description>이름, 이모지, 색상을 변경할 수 있습니다.</Description>
        );
    }
  };
  return <EDIT>{edit()}</EDIT>;
}

export default Edit;
