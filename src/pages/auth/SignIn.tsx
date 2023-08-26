import React, { FormEvent } from 'react';
import { signInApi } from '../../featuers/auth/api';
import useForm from '../../hooks/useForm';
import { signValidation } from '../../utils/regex';

const initialValue: SignInFormValue = {
  profileId: '',
  password: '',
};

function SignIn() {
  const { values, handleChange, error, setError } = useForm({ initialValue });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = signValidation(values);
    if (message) {
      return setError(message);
    }

    const signInUser: SignInFormValue = values;
    const result = await signInApi(signInUser);

    if (result) {
      // api 응답이 있을 시
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
