import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useLocation } from "react-router-dom";
//import "../CSS/Header.css";

function Header() {
  // Get current URL location
  const location = useLocation();

  // State variables for mobile view and hamburger menu
 
  return (
    <header className="">
      <a href="/ratesandcalc">Rates & Calculator</a>
     
    </header>
  );
}

export default Header;