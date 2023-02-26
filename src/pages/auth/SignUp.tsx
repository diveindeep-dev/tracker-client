import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi } from '../../features/auth/api';
import { getRandomColor, getRandomEmoji } from '../../utils/random';
import { idRegex, passwordRegex, nameRegex } from '../../utils/regex';

const initialValue: SignUpFormValue = {
  name: '',
  profileId: '',
  color: '',
  emoji: '',
  password: '',
  passwordConfirm: '',
};

function SignUp() {
  const [values, setValues] = useState<SignUpFormValue>(initialValue);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { profileId, name, password, passwordConfirm } = values;

    if (!profileId || !name || !password || !passwordConfirm) {
      return setError('모든 항목을 입력해주세요.');
    }
    if (password !== passwordConfirm) {
      return setError('비밀번호가 일치하지 않습니다.');
    }
    if (!idRegex.test(profileId)) {
      return setError(
        'ID는 최소 4자리 이상 가능합니다. 숫자와 영문만 가능하며 대소문자를 구분합니다.',
      );
    }
    if (!passwordRegex.test(password)) {
      return setError(
        '비밀번호는 8자리 이상, 숫자와 문자가 1자리 이상 포함되어야 합니다.',
      );
    }
    if (!nameRegex.test(name)) {
      return setError(
        '이름은 한글과 영문, 숫자가 가능합니다. 최소 2자리, 최대 10자리 가능합니다.',
      );
    }

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
