import { getRandomColor, getRandomEmoji } from '../utils/random';
import { add, format } from 'date-fns';

const randomColor = getRandomColor();
const randomEmoji = getRandomEmoji();
const today = new Date();
const formattedToday = format(today, 'yyyy-MM-dd');
const calDay = (day: number) => {
  const d = add(today, { days: day });
  return format(d, 'yyyy-MM-dd');
};

export const guestBio: Bio = {
  profileId: 'guest',
  name: 'GUEST',
  color: randomColor,
  emoji: randomEmoji,
};

export const guestSchedules = [
  {
    _id: `scheduleSample`,
    isDone: true,
    date: formattedToday,
    cheers: [],
    tracker: { text: '러닝 5km', _id: '' },
  },
  {
    _id: `scheduleSample`,
    isDone: false,
    date: formattedToday,
    cheers: [
      {
        _id: 'guest4',
        ...guestBio,
      },
    ],
    tracker: { text: '독서', _id: '' },
  },
  {
    _id: `scheduleSample`,
    isDone: true,
    date: formattedToday,
    cheers: [],
    tracker: { text: '알고리즘', _id: '' },
  },
];

export const guestSingleTrackerList = [
  {
    _id: '',
    user: { _id: 'guest', ...guestBio },
    text: '러닝 5km',
    tags: [{ _id: '', text: '매일매일' }],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-3),
    schedules: [
      {
        _id: 'scheduleSample',
        date: calDay(-3),
        isDone: true,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'scheduleSample', date: calDay(-2), isDone: true, cheers: [] },
      { _id: 'scheduleSample', date: calDay(-1), isDone: false, cheers: [] },
      { ...guestSchedules[0] },
      { _id: 'scheduleSample', date: calDay(1), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(2), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(3), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(4), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(5), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(6), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(7), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(8), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(9), isDone: false, cheers: [] },
      { _id: 'scheduleSample', date: calDay(10), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
  {
    _id: '',
    user: { _id: 'guest', ...guestBio },
    text: '독서',
    tags: [],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-5),
    schedules: [
      {
        _id: 'schduleSample',
        date: calDay(-5),
        isDone: true,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'schduleSample', date: calDay(-3), isDone: false, cheers: [] },
      { ...guestSchedules[1] },
      { _id: 'schduleSample', date: calDay(3), isDone: false, cheers: [] },
      { _id: 'schduleSample', date: calDay(7), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
  {
    _id: '',
    user: { _id: 'guest', ...guestBio },
    text: '알고리즘',
    tags: [{ _id: '', text: '코딩' }],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-10),
    schedules: [
      {
        _id: 'scheduleSample',
        date: calDay(-10),
        isDone: false,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'scheduleSample', date: calDay(-6), isDone: true, cheers: [] },
      { _id: 'scheduleSample', date: calDay(-2), isDone: true, cheers: [] },
      { ...guestSchedules[2] },
      { _id: 'scheduleSample', date: calDay(3), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
];

export const guestSingleTracker = {
  _id: 'tracekrSample02',
  user: { _id: 'guest', ...guestBio },
  text: '트래커 예시',
  tags: [
    { _id: '', text: 'Sample' },
    { _id: '', text: '예시' },
  ],
  cheers: [{ _id: 'guest1', ...guestBio }],
  created_at: calDay(-6),
  schedules: [
    {
      _id: 'scheduleSample',
      date: calDay(-5),
      isDone: true,
      cheers: [{ _id: 'guest1', ...guestBio }],
    },
    { _id: 'scheduleSample', date: calDay(-3), isDone: false, cheers: [] },
    { _id: 'scheduleSample', date: calDay(0), isDone: false, cheers: [] },
    { _id: 'scheduleSample', date: calDay(3), isDone: false, cheers: [] },
    { _id: 'scheduleSample', date: calDay(7), isDone: false, cheers: [] },
  ],
  updated_at: '2023-09-02T08:27:44.831Z',
};

export const fakeHandle = () => {};
