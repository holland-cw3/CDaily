import React from 'react';

import './App.css';
import Background from "./components/bg";
import Header from "./components/Header";
import Emails from "./pages/email";
import Extension from "./pages/extension";
import Home from "./pages/home";

import Rates from "./pages/ratesandcalc";




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>


      <Header/>
      <Background/>
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/emails" element={<Emails />} /> 

      <Route path="/extension" element={<Extension />} /> 

      <Route path="/ratesandcalc" element={<Rates />} /> 


      
      </Routes>
    </Router>
  );
}

export default App;
