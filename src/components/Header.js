import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../Images/cdaily.png"; // Importing image

import "../CSS/Header.css";

function Header() {
  // Get current URL location
  

  // State variables for mobile view and hamburger menu
 
  return (
    <header className="bg-black h-26">
      <div className="flex justify-between items-center h-full">
        <a href="/"><img src={logo} alt="logo" className="logo mt-1 mb-1 ml-5" /></a>
        <div className="flex mb-5 mr-3">
          <a href="/extension" className="text-white tab mt-4">Extension</a>
          <a href="/emails" className="text-white tab mt-4">Email</a>
          <a href="/ratesandcalc" className="text-white tab mt-4">Rates & Calculator</a>
        </div>
      </div>
    </header>
  );
}

export default Header;