import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProfileApi } from '../../features/auth/api';
import { fetchUser } from '../../features/auth/slice';
import { nameRegex } from '../../utils/regex';
import useForm from '../../hooks/useForm';
import Pic from '../../components/Pic';
import SettingMenu from './Menu';
import Edit from './Edit';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { hoverButton, media } from '../../styles/Mixin';

const Error = styled.div`
  text-align: right;
  padding: 0 5px;
  color: ${colorAll.red};
  font-family: ${fontAll.body};
  font-size: 0.9rem;
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

const Name = styled.div`
  padding: 15px 0 5px;
  font-family: ${fontAll.main};
  font-size: 1.2rem;
`;

const Id = styled.div`
  color: ${colorAll.grey};
  font-family: ${fontAll.main};
  font-size: 0.9rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid ${colorAll.light.line};
  ${media.mobile} {
    padding: 20px 10px;
  }
`;

const Right = styled.section`
  grid-area: right;
  padding: 20px;

  ${media.mobile} {
    padding: 10px;
  }
`;

const Left = styled.section`
  width: 100%;
  grid-area: left;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colorAll.light.line};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  width: 100%;
  min-height: 85vh;
`;

const SETTING = styled.div`
  width: 100%;
  h1 {
    width: 50%;
    border-right: 1px solid ${colorAll.light.line};
    padding: 30px 20px;
  }
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
        setMode('');
        setDisabled(true);
      } else {
        setError('다시 시도해주세요.');
      }
    } else {
      setDisabled(true);
    }
  };

  return (
    <SETTING>
      <h1>SETTING</h1>
      {signInUser ? (
        <Grid>
          <Left>
            <Container>
              <Pic
                emoji={values.emoji || signInUser.emoji}
                color={values.color || signInUser.color}
                size={[200, 130]}
              />
              <Name>{values.name || signInUser.name}</Name>
              <Id>@{signInUser.profileId}</Id>
            </Container>
            <SettingMenu handleMenu={setMode} mode={mode} />
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
        <div>프로필을 변경할 수 있습니다.</div>
      )}
    </SETTING>
  );
}

export default Setting;
