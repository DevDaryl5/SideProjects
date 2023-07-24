// npx create-react-app . // setups react in client side 

import React, { useState } from "react";
import Axios from "axios"
import './App.css';
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

export default function App() {
  ;
  return (
    <div className="route">
      <Router>
        <Routes>
          <Route index element={<Home />} /> {/* Default load into home page */}
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='Home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

