import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/auth/slice';
import { editProfileApi } from '../../features/user/api';
import useForm from '../../hooks/useForm';
import { ChromePicker, ColorResult } from 'react-color';
import { nameRegex } from '../../utils/regex';
import { emojis, getRandomColor, getRandomEmoji } from '../../utils/random';

const initialValue: EditProfileFormValue = {
  name: '',
  color: '',
  emoji: '',
};

function Setting() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const { values, setValues, handleChange, error, setError } = useForm({
    initialValue,
  });

  useEffect(() => {
    if (signInUser) {
      const isChanged = (key: string): boolean => {
        return values[key] === ''
          ? false
          : signInUser[key] === values[key]
          ? false
          : true;
      };

      if (isChanged('emoji') || isChanged('color') || isChanged('name')) {
        return setDisabled(false);
      } else {
        return setDisabled(true);
      }
    }
  }, [values]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name) {
      if (!nameRegex.test(values.name)) {
        return setError(
          '이름은 한글과 영문, 숫자가 가능합니다. 최소 2자리, 최대 10자리 가능합니다.',
        );
      }
    }

    if (signInUser?._id) {
      const editedValue: EditProfileFormValue = {};
      for (let key in values) {
        const val = values[key];
        if (val) {
          editedValue[key] = val;
        }
      }
      const res = await editProfileApi(signInUser._id, editedValue);
      if (res.status === 200) {
        dispatch(fetchUser());
        setValues(initialValue);
        setDisabled(true);
      } else {
        setError('다시 시도해주세요.');
      }
    } else {
      setDisabled(true);
    }
  };

  const handleChangeColor = (color: ColorResult) => {
    setValues({ ...values, color: color.hex });
  };

  return (
    <div>
      <h1>SETTING</h1>
      {signInUser ? (
        <div>
          <div>{values.color || signInUser.color}</div>
          <div>{values.emoji || signInUser.emoji}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={signInUser.name}
              name="name"
              onChange={handleChange}
              value={values.name}
            />
            <ChromePicker
              disableAlpha={true}
              onChange={handleChangeColor}
              color={values.color}
            />
            <div onChange={handleChange}>
              {emojis.map((emoji, i) => {
                return (
                  <Fragment key={i}>
                    <input type="radio" id={emoji} name="emoji" value={emoji} />
                    <label htmlFor={emoji}>{emoji}</label>
                  </Fragment>
                );
              })}
            </div>
            <div>{error}</div>
            <button type="submit" disabled={disabled}>
              EDIT
            </button>
          </form>
        </div>
      ) : (
        <>
          <div>{getRandomEmoji()}</div>
          <div>{getRandomColor()}</div>
          <div>프로필을 변경할 수 있습니다.</div>
        </>
      )}
    </div>
  );
}
export default Setting;
