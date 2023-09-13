import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../features/auth/slice';
import { editProfileApi } from '../../features/user/api';
import { nameRegex } from '../../utils/regex';
import useForm from '../../hooks/useForm';
import Pic from '../../components/Pic';
import Menu from './Menu';
import Edit from './Edit';
import SettingDescription from './Description';
import styled from 'styled-components';
import { flexCenter, hoverButton, media } from '../../styles/Mixin';
import { colorAll, fontAll } from '../../styles/Variables';
import { Name, ProfileId } from '../../styles/Tracker';

const Right = styled.section`
  grid-area: right;
  padding: 20px;

  ${media.mobile} {
    padding: 10px;
  }
`;

const Error = styled.div`
  text-align: right;
  padding: 0 5px;
  color: ${colorAll.light.red};
  font-family: ${fontAll.body};
`;

const SubmitButton = styled.button`
  ${hoverButton(`${colorAll.black}`)}
  padding: 5px 10px;
  font-size: 1.3rem;

  &:disabled {
    color: ${colorAll.light.grey};
    background: none;
    border: 1px solid ${colorAll.light.grey};
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;

  ${media.mobile} {
    flex-direction: column-reverse;
    ${Error} {
      padding: 10px 0;
    }
    ${SubmitButton} {
      align-self: flex-end;
    }
  }
`;

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: 30px 0;

  ${Name} {
    padding: 15px 0 5px;
  }
`;

const Left = styled.section`
  width: 100%;
  grid-area: left;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colorAll.line};
  h1 {
    padding: 20px 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  width: 100%;
`;

const initialValue: EditProfileFormValue = {
  name: '',
  color: '',
  emoji: '',
};

function Setting() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [mode, setMode] = useState<string>('');
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

  return (
    <div>
      {signInUser ? (
        <Grid>
          <Left>
            <h1>SETTING</h1>
            <Container>
              <Pic
                emoji={values.emoji || signInUser.emoji}
                color={values.color || signInUser.color}
                size={180}
              />
              <Name>{values.name || signInUser.name}</Name>
              <ProfileId>@{signInUser.profileId}</ProfileId>
            </Container>
            <Menu handleMenu={setMode} mode={mode} />
            <Form onSubmit={handleSubmit}>
              <Error>{error}</Error>
              <SubmitButton type="submit" disabled={disabled}>
                SAVE
              </SubmitButton>
            </Form>
          </Left>
          <Right>
            <Edit
              mode={mode}
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              setError={setError}
              setDisabled={setDisabled}
            />
          </Right>
        </Grid>
      ) : (
        <SettingDescription />
      )}
    </div>
  );
}
export default Setting;
