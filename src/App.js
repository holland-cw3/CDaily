import React from 'react';

import './App.css';
import Header from "./components/Header";
import Rates from "./pages/ratesandcalc";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/ratesandcalc" element={<Rates />} /> 

      
      </Routes>
    </Router>
  );
}

export default App;
