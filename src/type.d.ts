type AppDispatch = typeof store.dispatch;

interface User {
  _id?: string;
  profileId: string;
  name: string;
  color: string;
  emoji: string;
  [key: string]: string;
}

interface SignInFormValue {
  profileId: string;
  password: string;
}

interface SignUpFormValue extends SignInFormValue {
  name: string;
  color?: string;
  emoji?: string;
  passwordConfirm?: string;
}

interface Auth {
  isAuthenticated: boolean;
  signInUser: User | null;
}

interface State {
  auth: Auth;
}

interface EditProfileFormValue {
  name?: string;
  color?: string;
  emoji?: string;
  [key: string]: string;
}
