import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import Index from './pages';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
