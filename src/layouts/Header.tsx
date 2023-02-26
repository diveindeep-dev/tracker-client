import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../features/auth/slice';

function Header() {
  const signInUser = useSelector((state: State) => state.auth.signInUser);
  const dispath = useDispatch<AppDispatch>();

  const authComponent = signInUser ? (
    <>
      <div>Hi, {signInUser.name}</div>
      <button onClick={() => dispath(signOut())}>Logout</button>
    </>
  ) : (
    <>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/signin'}>Sign In</Link>
    </>
  );
  return (
    <header>
      <Link to={`/`}>TRACKER</Link>
      <div>{authComponent}</div>
    </header>
  );
}

export default Header;
