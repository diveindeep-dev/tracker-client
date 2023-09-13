import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../features/auth/slice';
import { signInApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { signValidation } from '../../utils/regex';
import styled from 'styled-components';
import { colorAll, fontAll } from '../../styles/Variables';
import { hoverButton, media } from '../../styles/Mixin';

export const Error = styled.div`
  color: ${colorAll.light.red};
  font-family: ${fontAll.body};
  padding: 0 20px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  ${hoverButton(colorAll.main)}
  padding: 5px 15px;
  font-size: 1.3rem;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 10px 20px;
  div {
    min-width: 100px;
  }
`;

export const Form = styled.form`
  font-family: ${fontAll.logo};
  width: 100%;
  padding: 20px;
  input {
    margin: 15px 0;
    padding: 10px;
    width: 100%;
    background-color: ${colorAll.line};
    border-radius: 10px;
  }
`;

export const FormDiv = styled.div`
  display: flex;

  h1 {
    padding: 20px;
    width: 200px;
    color: ${colorAll.main};
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;

const initialValue: SignInFormValue = {
  profileId: '',
  password: '',
};

function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const { values, handleChange, error, setError, resetValues } = useForm({
    initialValue,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = signValidation(values);
    if (message) {
      return setError(message);
    }

    const signInUser: SignInFormValue = values;
    const result = await signInApi(signInUser);

    if (result) {
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token);
        dispatch(fetchUser());
      } else {
        setError(result.data.message);
        resetValues();
      }
    } else {
      setError('서버가 불안정합니다. 잠시후 다시 시도해주세요.');
    }
  };

  return (
    <FormDiv>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Wrap>
          <div>ID</div>
          <input
            type="text"
            name="profileId"
            placeholder="ID"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <div>Password</div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <Error>{error}</Error>
          <SubmitButton type="submit">Sign In</SubmitButton>
        </Wrap>
      </Form>
    </FormDiv>
  );
}

export default SignIn;
