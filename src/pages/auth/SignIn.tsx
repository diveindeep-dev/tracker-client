import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../features/auth/slice';
import { signInApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import { signValidation } from '../../utils/regex';

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
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profileId"
          placeholder="ID"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <div>{error}</div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
