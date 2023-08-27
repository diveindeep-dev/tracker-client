import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { signValidation } from '../../utils/regex';
import { getRandomColor, getRandomEmoji } from '../../utils/random';

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profileId"
          placeholder="ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="password confirm"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
