import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import Index from './pages';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
