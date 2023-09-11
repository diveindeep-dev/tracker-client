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
    _id: `schedulesample01`,
    isDone: true,
    date: formattedToday,
    cheers: [],
    tracker: { text: '러닝 5km', _id: 'tracekrSample01' },
  },
  {
    _id: `schedulesample02`,
    isDone: false,
    date: formattedToday,
    cheers: [
      {
        _id: 'guest4',
        ...guestBio,
      },
    ],
    tracker: { text: '독서', _id: 'tracekrSample02' },
  },
  {
    _id: `schedulesample03`,
    isDone: true,
    date: formattedToday,
    cheers: [],
    tracker: { text: '알고리즘', _id: 'tracekrSample03' },
  },
];

export const guestSingleTrackerList = [
  {
    _id: 'tracekrSample00',
    user: { _id: 'guest', ...guestBio },
    text: '러닝 5km',
    tags: ['매일매일'],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-3),
    schedules: [
      {
        _id: 'schedule0001',
        date: calDay(-3),
        isDone: true,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'schedule0002', date: calDay(-2), isDone: true, cheers: [] },
      { _id: 'schedule0003', date: calDay(-1), isDone: false, cheers: [] },
      { ...guestSchedules[0] },
      { _id: 'schedule0004', date: calDay(1), isDone: false, cheers: [] },
      { _id: 'schedule0005', date: calDay(2), isDone: false, cheers: [] },
      { _id: 'schedule0006', date: calDay(3), isDone: false, cheers: [] },
      { _id: 'schedule0007', date: calDay(4), isDone: false, cheers: [] },
      { _id: 'schedule0008', date: calDay(5), isDone: false, cheers: [] },
      { _id: 'schedule0009', date: calDay(6), isDone: false, cheers: [] },
      { _id: 'schedule0010', date: calDay(7), isDone: false, cheers: [] },
      { _id: 'schedule0011', date: calDay(8), isDone: false, cheers: [] },
      { _id: 'schedule0012', date: calDay(9), isDone: false, cheers: [] },
      { _id: 'schedule0013', date: calDay(10), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
  {
    _id: 'tracekrSample01',
    user: { _id: 'guest', ...guestBio },
    text: '독서',
    tags: [],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-5),
    schedules: [
      {
        _id: 'schedule00014',
        date: calDay(-5),
        isDone: true,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'schedule03015', date: calDay(-3), isDone: false, cheers: [] },
      { ...guestSchedules[1] },
      { _id: 'schedule03016', date: calDay(3), isDone: false, cheers: [] },
      { _id: 'schedule03017', date: calDay(7), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
  {
    _id: 'tracekrSample02',
    user: { _id: 'guest', ...guestBio },
    text: '알고리즘',
    tags: ['코딩'],
    cheers: [{ _id: 'guest1', ...guestBio }],
    created_at: calDay(-10),
    schedules: [
      {
        _id: 'schedule00018',
        date: calDay(-10),
        isDone: false,
        cheers: [{ _id: 'guest1', ...guestBio }],
      },
      { _id: 'schedule03019', date: calDay(-6), isDone: true, cheers: [] },
      { _id: 'schedule00020', date: calDay(-2), isDone: true, cheers: [] },
      { ...guestSchedules[2] },
      { _id: 'schedule03021', date: calDay(3), isDone: false, cheers: [] },
    ],
    updated_at: '2023-09-02T08:27:44.831Z',
  },
];

export const guestSingleTracker = {
  _id: 'tracekrSample02',
  user: { _id: 'guest', ...guestBio },
  text: '트래커 예시',
  tags: ['Sample', '예시'],
  cheers: [{ _id: 'guest1', ...guestBio }],
  created_at: calDay(-6),
  schedules: [
    {
      _id: 'schedule090001',
      date: calDay(-5),
      isDone: true,
      cheers: [{ _id: 'guest1', ...guestBio }],
    },
    { _id: 'schedule009002', date: calDay(-3), isDone: false, cheers: [] },
    { _id: 'schedule09003', date: calDay(0), isDone: false, cheers: [] },
    { _id: 'schedule009004', date: calDay(3), isDone: false, cheers: [] },
    { _id: 'schedule009005', date: calDay(7), isDone: false, cheers: [] },
  ],
  updated_at: '2023-09-02T08:27:44.831Z',
};

export const fakeHandle = async (id: string) => {};
