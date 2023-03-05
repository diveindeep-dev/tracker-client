import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { newTrackerApi } from '../../features/tracker/api';
import { format, isSaturday, isSunday } from 'date-fns';
import { calculateByte, make2week } from '../../utils';
import useForm from '../../hooks/useForm';
import Pic from '../Pic';
import styled from 'styled-components';
import { AiOutlineLink, AiFillTags } from 'react-icons/ai';
import { circle, flexCenter, hoverButton, media } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

const initialValue: Tracker = {
  text: '',
  user: '',
  schedule: [],
};

interface ByteProps {
  byte: number;
}

interface LabelProps {
  order: number;
}

interface WeekProps {
  weekend: string;
}

const Byte = styled.div<ByteProps>`
  ${circle(35)}
  margin: 0 5px;
  color: ${({ byte }) =>
    byte > 48
      ? `${colorAll.light.red}`
      : byte > 40
      ? `${colorAll.light.blue}`
      : `${colorAll.light.grey}`};
  border: 1px solid
    ${({ byte }) =>
      byte > 48
        ? `${colorAll.light.red}`
        : byte > 40
        ? `${colorAll.light.blue}`
        : `${colorAll.white}`};
  font-family: ${fontAll.logo};
  font-size: 1rem;
`;

const InputText = styled.input`
  width: 100%;
  font-family: ${fontAll.main};
  font-size: 1.5rem;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const FakeCheckBox = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border: 1px solid ${colorAll.light.grey};
`;

const LabelAll = styled.label`
  display: flex;
  align-items: center;
  align-self: flex-end;
  padding: 5px 0;
  color: ${colorAll.grey};
  &:hover {
    cursor: pointer;
  }
`;

const Back = styled.div<WeekProps>`
  padding: 50% 0 0 50%;
  font-size: clamp(2.8rem, calc(100vw / 14), 3.5rem);
  color: ${({ weekend }) =>
    weekend === 'SUN'
      ? `${colorAll.light.red}`
      : weekend === 'SAT'
      ? `${colorAll.light.blue}`
      : `${colorAll.light.grey}`};
  opacity: 0.3;

  ${media.mobile} {
    font-size: calc(100vw / 7);
  }
`;

const DATE = styled.div`
  ${flexCenter}
  position: absolute;
  font-size: clamp(1.5rem, calc(100vw / 35), 2rem);
  opacity: 0.4;
  &:hover {
    opacity: 0.7;
  }
  ${media.mobile} {
    font-size: calc(100vw / 15);
  }
`;

const TrackContainer = styled.div`
  ${flexCenter}
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 1.6rem;
`;

const TRACK = styled.label<LabelProps>`
  position: relative;
  width: 8%;
  border-top: 1px solid ${colorAll.light.grey};
  border-left: ${({ order }) =>
    order === 0 && `1px solid ${colorAll.light.grey};`};
  border-bottom: 1px solid ${colorAll.light.grey};
  border-right: 1px solid ${colorAll.light.grey};

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  &:hover {
    cursor: pointer;
  }
  ${media.mobile} {
    width: 14.2%;
    border-top: ${({ order }) => order > 6 && `0px`};
    border-left: ${({ order }) =>
      (order === 0 || order === 7) && `1px solid ${colorAll.light.grey};`};
  }
`;

const Tracks = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  ${media.mobile} {
    flex-wrap: wrap;
  }
`;

const InvisibleInput = styled.input`
  display: none;

  &:checked + ${LabelAll} {
    color: ${colorAll.red};
    ${FakeCheckBox} {
      &::after {
        content: '✔';
        display: block;
        margin-top: -3px;
      }
    }
  }

  &:checked + ${TRACK} {
    ${DATE} {
      opacity: 0.9;
    }
    ${Back} {
      opacity: 0.8;
    }
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${fontAll.logo};
`;

const Icon = styled.div`
  padding: 5px;
  font-size: 1.3rem;
  color: ${colorAll.grey};
`;

const InputDetail = styled.input`
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid ${colorAll.light.line};
  font-family: ${fontAll.body};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 0;
  div {
    display: flex;
    align-items: center;
  }
`;

const Button = styled.button`
  ${hoverButton(`${colorAll.red}`)}
  font-size: 1rem;
  padding: 8px 15px;
  margin-left: 10px;

  &:disabled {
    color: ${colorAll.light.grey};
    border: 1px solid ${colorAll.light.grey};
    background: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;

  div {
    color: ${colorAll.grey};
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  width: 100%;
  padding-left: 15px;
`;

const NEW = styled.div`
  display: flex;
  padding: 20px 15px;
  border-bottom: 1px solid ${colorAll.light.line};
  ${media.mobile} {
    padding: 20px 15px;
  }
`;

function NewTracker() {
  const signedUser = useSelector((state: State) => state.auth.signInUser);
  const { values, setValues, handleChange, resetValues, setError, error } =
    useForm({
      initialValue,
    });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [tagString, setTagString] = useState<string>('');
  const [checkedDate, setCheckedDate] = useState<string[]>([]);
  const [byte, setByte] = useState<number>(0);
  const weekFromToday: string[] = make2week();

  useEffect(() => {
    const { text, schedule } = values;
    text && schedule.length ? setDisabled(false) : setDisabled(true);
  }, [values]);

  useEffect(() => {
    setValues({ ...values, schedule: checkedDate });
  }, [checkedDate]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const totalByte = calculateByte(value);
    setByte(totalByte);
    if (totalByte > 50) {
      setDisabled(true);
    } else {
      setValues({ ...values, text: value });
    }
  };

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTagString(value);
    const tagsText: string = value.replaceAll(' ', '').toUpperCase();
    const tagsArray = tagsText.split(',').filter((tag) => tag.length > 0);
    const tagSet = new Set(tagsArray);
    setValues({ ...values, tags: Array.from(tagSet) });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signedUser?._id) {
      const submitValues = {
        ...values,
        user: signedUser._id,
      };
      const result = await newTrackerApi(submitValues);
      if (result.status === 201) {
        resetValues();
        setTagString('');
        setCheckedDate([]);
      } else {
        setError(`다시 시도해주세요.`);
      }
    }
  };

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const targetIndex = checkedDate.indexOf(id);
    const newChecked = [...checkedDate];

    if (targetIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(targetIndex, 1);
    }

    setCheckedDate(newChecked);
  };

  const isAllChecked = checkedDate.length === 14;
  const handleAllChecked = () => {
    isAllChecked ? setCheckedDate([]) : setCheckedDate(weekFromToday);
  };

  const makeTracks = weekFromToday.map((day: string, i: number) => {
    const theDay = new Date(day);
    const date = format(theDay, 'dd');
    const weekday = format(theDay, 'EEEEE');
    const weekend = isSunday(theDay) ? 'SUN' : isSaturday(theDay) ? 'SAT' : '';

    return (
      <Fragment key={i}>
        <InvisibleInput
          type="checkbox"
          id={day}
          onChange={handleToggle}
          checked={checkedDate.includes(day)}
        />
        <TRACK htmlFor={day} order={i}>
          <TrackContainer>
            <Back weekend={weekend}>{weekday}</Back>
            <DATE>{date}</DATE>
          </TrackContainer>
        </TRACK>
      </Fragment>
    );
  });

  return (
    <NEW>
      {signedUser && (
        <>
          <Pic emoji={signedUser.emoji} color={signedUser.color} />
          <Form onSubmit={handleSubmit}>
            <TextContainer>
              <InputText
                type="text"
                name="text"
                value={values.text}
                onChange={handleChangeText}
                placeholder={`What is TRACKED?`}
              />
              <Byte byte={byte}>{50 - byte}</Byte>
            </TextContainer>
            <CheckBoxContainer>
              <InvisibleInput
                type="checkbox"
                id="allCheck"
                onChange={handleAllChecked}
                checked={isAllChecked}
              />
              <LabelAll htmlFor="allCheck">
                <FakeCheckBox />
                EVERYDAY
              </LabelAll>
              <Tracks>{makeTracks}</Tracks>
            </CheckBoxContainer>
            <DetailContainer>
              <div>
                <Icon>
                  <AiOutlineLink />
                </Icon>
                <InputDetail
                  type="text"
                  name="url"
                  value={values.url || ''}
                  onChange={handleChange}
                  placeholder={`URL`}
                />
              </div>
              <div>
                <Icon>
                  <AiFillTags />
                </Icon>
                <InputDetail
                  type="text"
                  name="tags"
                  value={tagString}
                  onChange={handleChangeTag}
                  placeholder={`TAGS`}
                />
              </div>
            </DetailContainer>
            <ButtonContainer>
              <div>{error}</div>
              <Button type="submit" disabled={disabled}>
                MAKE TRACKER
              </Button>
            </ButtonContainer>
          </Form>
        </>
      )}
    </NEW>
  );
}

export default NewTracker;
