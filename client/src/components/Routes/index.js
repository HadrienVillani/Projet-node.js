import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import ConnectForm from '../../pages/ConnectForm';
function index() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/connectForm' element={<ConnectForm />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  );
}
export default index;
