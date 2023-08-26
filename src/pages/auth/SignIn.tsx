import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signInApi } from '../../featuers/auth/api';
import { idRegex } from '../../utils/regex';

const initialValue: SignInFormValue = {
  profileId: '',
  password: '',
};

function SignIn() {
  const [values, setValues] = useState<SignInFormValue>(initialValue);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { profileId, password } = values;

    if (!profileId || !password) {
      return setError('모든 항목을 입력해주세요.');
    }
    if (!idRegex.test(profileId)) {
      return setError('ID 형식이 유효하지 않습니다.');
    }

    const signInUser: SignInFormValue = {
      profileId,
      password,
    };

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
