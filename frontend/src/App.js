import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Home from './pages/home';
import Login from './pages/login';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
