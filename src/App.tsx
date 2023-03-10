import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchUser } from './features/auth/slice';
import Layout from './layouts';
import Index from './pages';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/profile';
import Setting from './pages/setting';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: State) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate replace to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate replace to="/" /> : <SignIn />}
          />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
