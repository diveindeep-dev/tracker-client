import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signUpApi } from '../../featuers/auth/api';
import { idRegex, nameRegex, passwordRegex } from '../../utils/regex';
import { getRandomColor, getRandomEmoji } from '../../utils/random';

const initialValue: SignUpFormValue = {
  profileId: '',
  name: '',
  password: '',
  color: '',
  emoji: '',
};

function SignUp() {
  const [values, setValues] = useState<SignUpFormValue>(initialValue);
  const [error, setError] = useState<string>('');

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
      return setError('비밀번호와 비밀번호확인 항목이 일치하지 않습니다.');
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
      // api 응답이 있을 시
    } else {
      setError('서버가 불안정합니다. 잠시후 다시 시도해주세요.');
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
