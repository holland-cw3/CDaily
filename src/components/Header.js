import React from "react";
import logo from "../Images/cdaily.png"; // Importing image

import "../CSS/Header.css";
import { useLocation } from "react-router-dom";


function Header() {
  // Get current URL location
  const location = useLocation();


  // State variables for mobile view and hamburger menu
 if (location.pathname === '/ratesExtension'){
  return (
    <div>hi</div>
  );
 }
  return (
    
    <header className="bg-black h-26">
      <div className="flex justify-between items-center h-full">
        <a href="/"><img src={logo} alt="logo" className="logo mt-1 mb-1 ml-5" /></a>
        <div className="flex mb-5 mr-3 text-3xl">
          <a href="/about" className="text-white tab mt-4">About</a>
          <a href="/contact" className="text-white tab mt-4">Contact</a>
          <a href="/extension" className="text-white tab mt-4">Extension</a>
          <a href="/emails" className="text-white tab mt-4">Email</a>
          <a href="/ratesandcalc" className="text-white tab mt-4">Rates & Calculator</a>
        </div>
      </div>
    </header>
  );
}

export default Header;