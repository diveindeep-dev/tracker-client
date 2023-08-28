import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/auth/slice';
import Layout from './layouts';
import Index from './pages';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Home from './pages/home';
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
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate replace to="/home" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate replace to="/home" /> : <SignIn />}
          />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
