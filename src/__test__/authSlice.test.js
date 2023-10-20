import authReducer, { signOut } from '../features/auth/slice';

describe('User Slice', () => {
  const state = {
    isAuthenticated: true,
    signInUser: { _id: 'test' },
  };

  it('should handle initial state', () => {
    const initialState = state;
    const action = { type: 'unknown' };

    expect(authReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle signOut', () => {
    const initialState = state;
    const action = signOut();
    const expectedState = {
      isAuthenticated: false,
      signInUser: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
