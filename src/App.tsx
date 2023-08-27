import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './features/auth/slice';
import Layout from './layouts';
import Index from './pages';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
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
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate replace to="/" /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate replace to="/" /> : <SignIn />}
          />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
