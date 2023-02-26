import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInApi } from '../../features/auth/api';
import { fetchUser } from '../../features/auth/slice';
import { idRegex } from '../../utils/regex';

const initialValue: SignInFormValue = {
  profileId: '',
  password: '',
};

function SignIn() {
  const [values, setValues] = useState<SignInFormValue>(initialValue);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

    const user: SignInFormValue = {
      profileId,
      password,
    };

    const result = await signInApi(user);

    if (result) {
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token);
        dispatch(fetchUser());
        navigate('/');
      } else {
        setError(result.data.message);
        setValues(initialValue);
      }
    } else {
      setError(`서버가 불안정합니다. 다시 시도해주세요.`);
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