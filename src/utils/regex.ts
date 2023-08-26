export const idRegex: RegExp = /^[a-zA-Z0-9]{4,20}$/;
export const passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const nameRegex: RegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;

export const signValidation = (inputValues: any) => {
  for (let key in inputValues) {
    const value = inputValues[key];
    if (!value) {
      return '모든 항목을 입력하세요.';
    }
  }

  const { profileId, name, password, passwordConfirm } = inputValues;
  if (profileId) {
    if (!idRegex.test(profileId)) {
      return 'ID는 4자리 이상의 숫자와 영문만 가능하며 대소문자를 구별합니다.';
    }
  }

  if (password) {
    if (passwordConfirm) {
      if (password !== passwordConfirm) {
        return '비밀번호와 비밀번호 확인 항목이 서로 일치하지 않습니다.';
      }
    }
    if (!passwordRegex.test(password)) {
      return '비밀번호는 8자리 이상, 숫자와 문자가 1자리 이상 포함되어야 합니다.';
    }
  }

  if (name) {
    if (!nameRegex.test(name)) {
      return '이름은 한글과 영문, 숫자가 가능합니다. 최소 2자리, 최대 10자리 가능합니다.';
    }
  }
};
