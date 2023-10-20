import userReducer, { setTrackers, setSchedules } from '../features/user/slice';

describe('User Slice', () => {
  const state = {
    bio: null,
    isSignedUser: false,
    todaySchedules: [],
    trackers: [],
  };

  it('should handle initial state', () => {
    const initialState = state;
    const action = { type: 'unknown' };

    expect(userReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setTracker', () => {
    const initialState = state;
    const action = setTrackers([{ id: '123' }, { id: '456' }]);
    const expectedState = {
      ...state,
      trackers: [{ id: '123' }, { id: '456' }],
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setSchedules', () => {
    const initialState = state;
    const newSchedule = [
      { _id: 'newSchedule', isdone: true, date: '2023-01-01', cheers: [] },
    ];
    const action = setSchedules(newSchedule);
    const expectedState = { ...state, todaySchedules: newSchedule };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
