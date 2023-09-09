type AppDispatch = typeof store.dispatch;

interface SignUpFormValue {
  profileId: string;
  name: string;
  password: string;
  color: string;
  emoji: string;
}

type Bio = Omit<SignUpFormValue, 'password'>;

interface User extends Bio {
  _id?: string;
  [key: string]: string;
}

type SignUpValidationValue = {
  profileId: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

type SignInFormValue = Pick<SignUpFormValue, 'profileId' | 'password'>;

interface Auth {
  isAuthenticated: boolean;
  signInUser: User | null;
}

interface State {
  auth: Auth;
  profile: Profile;
}

type EditProfileFormValue = {
  name?: string;
  color?: string;
  emoji?: string;
  [key: string]: string;
};

interface NewTrackerFormValue {
  text: string;
  user: string;
  schedule: string[];
  tags?: string[];
  url?: string;
}

interface Tracker {
  _id: string;
  text: string;
  user: User;
  schedules: Schedule[];
  tags: string[];
  url?: string;
  created_at: string;
  cheers: User[];
}

interface Schedule {
  _id: string;
  isDone: boolean;
  date: string;
  cheers: User[];
}

interface ScheduleFull extends Schedule {
  tracker?: { text: string; _id: string };
}

interface ParamsUserValue {
  profileId: string;
  signedId?: string;
}

interface Profile {
  bio: Bio | null;
  isSignedUser: boolean;
  todaySchedules: ScheduleFull[];
  trackers: Tracker[];
}
