import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NewJob from './components/newJob.jsx';
import Main from './components/Main.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div
      className='wrapper'
      style={{ padding: 0, margin: 0, boxSizing: 'border-box' }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/newjob' element={<NewJob />} />
        <Route path='/home' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
