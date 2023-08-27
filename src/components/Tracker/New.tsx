import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { newTrackerApi } from '../../features/tracker/api';
import useForm from '../../hooks/useForm';
import Pic from '../Pic';
import { make2week } from '../../utils';
import { getRandomColor, getRandomEmoji } from '../../utils/random';

const initialValue: NewTrackerFormValue = {
  text: '',
  user: '',
  schedule: [],
};
const initialUser = { color: getRandomColor(), emoji: getRandomEmoji() };

function NewTracker() {
  const signedUser = useSelector((state: State) => state.auth.signInUser);
  const [user, setUser] = useState(initialUser);
  const { values, setValues, handleChange, resetValues, setError, error } =
    useForm({
      initialValue,
    });
  const [checkedDate, setCheckedDate] = useState<string[]>([]);
  const [tagString, setTagString] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
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
    const { text, schedule } = values;
    text && schedule.length ? setDisabled(false) : setDisabled(true);
  }, [values]);

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

    return (
      <Fragment key={i}>
        <input
          type="checkbox"
          id={day}
          onChange={handleToggle}
          checked={checkedDate.includes(day)}
        />
        <label htmlFor={day}>
          {date}
          {weekday}
        </label>
      </Fragment>
    );
  });

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
    } else {
      setDisabled(true);
    }
  };

  return (
    <div>
      <Pic emoji={user.emoji} color={user.color} size={50} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={values.text}
          onChange={handleChange}
          placeholder={`What is TRACKED?`}
        />
        <div>
          <input
            type="checkbox"
            id="allCheck"
            onChange={handleAllChecked}
            checked={isAllChecked}
          />
          <label htmlFor="allCheck">EVERYDAY</label>
          <div>{makeTracks}</div>
        </div>
        <input
          type="text"
          name="url"
          value={values.url || ''}
          onChange={handleChange}
          placeholder={`URL`}
        />
        <input
          type="text"
          name="tags"
          value={tagString}
          onChange={handleChangeTag}
          placeholder={`TAGS`}
        />
        <div>{error}</div>
        <button type="submit" disabled={disabled}>
          MAKE TRACKER
        </button>
      </form>
    </div>
  );
}

export default NewTracker;
