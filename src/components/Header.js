import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import logo from "../Images/cdaily.png"; // Importing image

import "../CSS/Header.css";

function Header() {
  // Get current URL location

  // State variables for mobile view and hamburger menu
 
  return (
    <header className="bg-black h-26">
      <div className ="flex">
      <a href="/"><img src={logo} alt="" className="logo mb-2" /></a>
      <a href="/extension" className="text-white">Extension</a>
      <a href="/emails" className="text-white">Email</a>
      <a href="/ratesandcalc" className="text-white">Rates & Calculator</a>

      </div>
     
      



    </header>
  );
}

export default Header;