import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LogIn from './Container/Log/LogIn/LogIn';
import SignUp from './Container/Log/SignUp/SignUp';
import Home from './Container/Log/Home/Home';
import ProtectedFeed from './Container/Feed/ProtectedFeed';
import PageNotFound from './Container/Log/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<ProtectedFeed />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
