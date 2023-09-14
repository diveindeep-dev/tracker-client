import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { format, isSaturday, isSunday } from 'date-fns';
import { AiOutlineLink, AiFillTags } from 'react-icons/ai';
import { newTrackerApi } from '../../features/tracker/api';
import useForm from '../../hooks/useForm';
import Pic from '../Pic';
import { calculateByte, make2week } from '../../utils';
import { guestBio } from '../../config/guestData';
import styled from 'styled-components';
import {
  TRACKS,
  WeekBack,
  dateStyle,
  trackAbsolute,
  trackBorder,
} from '../../styles/Track';
import { circle, hoverButton, media, postContainer } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';

interface NewProps {
  setTrue: Dispatch<SetStateAction<boolean>>;
  retracker?: Retracker;
}

interface ByteProps {
  $byte: number;
}

interface BorderProps {
  order: number;
}

const DATE = styled.div`
  ${dateStyle}
  opacity: 0.4;
  &:hover {
    opacity: 0.7;
  }
`;

const TrackContainer = styled.div`
  ${trackAbsolute}
  font-size: 1.6rem;
`;

const TrackBorderLabel = styled.label<BorderProps>`
  ${({ order }) => trackBorder(order)};
  position: relative;
  width: 8%;
  &:hover {
    cursor: pointer;
  }

  ${media.mobile} {
    width: 14.2%;
  }
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
  color: ${colorAll.light.grey};
  font-family: ${fontAll.logo};

  &:hover {
    cursor: pointer;
  }
`;

const InvisibleInput = styled.input`
  display: none;

  &:checked + ${LabelAll} {
    color: ${colorAll.main};
    ${FakeCheckBox} {
      &::after {
        content: '✔';
        display: block;
        margin-top: -3px;
      }
    }
  }

  &:checked + ${TrackBorderLabel} {
    ${DATE} {
      opacity: 0.9;
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
  color: ${colorAll.light.grey};
`;

const InputDetail = styled.input`
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid ${colorAll.line};
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

const Byte = styled.div<ByteProps>`
  ${circle(35)}
  margin: 0 5px;
  color: ${({ $byte }) =>
    $byte > 48
      ? `${colorAll.light.red}`
      : $byte > 40
      ? `${colorAll.light.blue}`
      : `${colorAll.light.grey}`};
  border: 1px solid
    ${({ $byte }) =>
      $byte > 48
        ? `${colorAll.light.red}`
        : $byte > 40
        ? `${colorAll.light.blue}`
        : `${colorAll.back}`};
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

const Form = styled.form`
  width: 100%;
  padding-left: 15px;
`;

const Button = styled.button`
  ${hoverButton(`${colorAll.main}`)}
  font-size: 1rem;
  padding: 5px 10px;
  margin-left: 10px;

  &:disabled {
    color: ${colorAll.light.grey};
    border: 1px solid ${colorAll.light.grey};
    background: none;
  }
`;

const Error = styled.div`
  color: ${colorAll.light.red};
  font-size: 1.1rem;
  font-family: ${fontAll.body};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
`;

const Div = styled.div<BorderProps>`
  ${postContainer}
  ${({ order }) => !order && `border-bottom: 0;`};
`;

const initialValue: NewTrackerFormValue = {
  text: '',
  user: '',
  tags: [],
  schedule: [],
};
const initialUser = { color: guestBio.color, emoji: guestBio.emoji };

function NewTracker({ setTrue, retracker }: NewProps) {
  const signedUser = useSelector((state: State) => state.auth.signInUser);
  const [user, setUser] = useState(initialUser);
  const { values, setValues, handleChange, resetValues, setError, error } =
    useForm({
      initialValue,
    });
  const [checkedDate, setCheckedDate] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [byte, setByte] = useState<number>(0);
  const weekFromToday: string[] = make2week();

  useEffect(() => {
    if (signedUser) {
      setUser({ color: signedUser.color, emoji: signedUser.emoji });
    }
  }, [signedUser]);

  useEffect(() => {
    setValues({ ...values, schedule: checkedDate });
  }, [checkedDate]);

  useEffect(() => {
    if (retracker) {
      const tags = retracker.tags.map((tag) => tag.text);
      setTagString(tags.toString());
      const totalByte = calculateByte(retracker.text);
      setByte(totalByte);
      setValues({
        ...values,
        text: retracker.text,
        tags: tags,
        url: retracker.url,
      });
    }
  }, []);

  useEffect(() => {
    const { text, schedule } = values;
    signedUser && text && schedule.length
      ? setDisabled(false)
      : setDisabled(true);
  }, [values, signedUser]);

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTagString(value);
    const tagsText: string = value.replaceAll(' ', '').toUpperCase();
    const tagsArray = tagsText.split(',').filter((tag) => tag.length > 0);
    const tagSet = new Set(tagsArray);
    setValues({ ...values, tags: Array.from(tagSet) });
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
        <TrackBorderLabel htmlFor={day} order={i}>
          <TrackContainer>
            <WeekBack $weekend={weekend}>{weekday}</WeekBack>
            <DATE>{date}</DATE>
          </TrackContainer>
        </TrackBorderLabel>
      </Fragment>
    );
  });

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
        setTrue(true);
      } else {
        setError(`다시 시도해주세요.`);
      }
    } else {
      setDisabled(true);
    }
  };

  return (
    <Div order={retracker ? 0 : 1}>
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <Form onSubmit={handleSubmit}>
        <TextContainer>
          <InputText
            type="text"
            name="text"
            value={values.text}
            onChange={handleChangeText}
            placeholder={`What is TRACKED?`}
          />
          <Byte $byte={byte}>{50 - byte}</Byte>
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
          <TRACKS>{makeTracks}</TRACKS>
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
          <Error>{error}</Error>
          <Button type="submit" disabled={disabled}>
            MAKE TRACKER
          </Button>
        </ButtonContainer>
      </Form>
    </Div>
  );
}

export default NewTracker;
