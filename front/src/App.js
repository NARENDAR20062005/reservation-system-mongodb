import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Reserve from './component/Reserve';
import Navbar from './component/Navbar';
import View from './component/View';
import axios from 'axios';


function App() {
  
  return (
    <BrowserRouter>
      <Navbar  /> 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
