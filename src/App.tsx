import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchUser } from './features/auth/slice';
import Layout from './layouts';
import Index from './pages';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Setting from './pages/setting';

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
          <Route path="/setting" element={<Setting />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
