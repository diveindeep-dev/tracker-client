import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { signValidation } from '../../utils/regex';
import { getRandomColor, getRandomEmoji } from '../../utils/random';
import { Error, Form, FormDiv, SubmitButton, Wrap } from './SignIn';

const initialValue: SignUpValidationValue = {
  profileId: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

function SignUp() {
  const navigate = useNavigate();
  const { values, handleChange, error, setError, resetValues } = useForm({
    initialValue,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = signValidation(values);
    if (message) {
      return setError(message);
    }

    const { profileId, name, password } = values;
    const newUser: SignUpFormValue = {
      profileId,
      name,
      password,
      color: getRandomColor(),
      emoji: getRandomEmoji(),
    };

    const result = await signUpApi(newUser);

    if (result) {
      if (result.status === 201) {
        navigate('/signin');
      } else {
        setError(result.data.message);
        resetValues();
      }
    } else {
      setError(`서버가 불안정합니다. 다시 시도해주세요.`);
    }
  };

  return (
    <FormDiv>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Wrap>
          <div>ID</div>
          <input
            type="text"
            name="profileId"
            value={values.profileId}
            placeholder="ID"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <div>Name</div>
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="name"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <div>Password</div>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="password"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <div>Password Confirm</div>
          <input
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            placeholder="password confirm"
            onChange={handleChange}
          />
        </Wrap>
        <Wrap>
          <Error>{error}</Error>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Wrap>
      </Form>
    </FormDiv>
  );
}

export default SignUp;
