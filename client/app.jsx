import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Main from './components/Main.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  return (
    <div
      className='wrapper'
      style={{ padding: 0, margin: 0, boxSizing: 'border-box' }}
    >
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
