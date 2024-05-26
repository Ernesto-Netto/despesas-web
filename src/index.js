import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import CadDespesa from './pages/cad-depesa/cad-depesa.jsx'
import "./styles/global.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/despesa/:idUrl" element={<CadDespesa/>}></Route>
  </Routes>
  </BrowserRouter>

);

