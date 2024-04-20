import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/home.css";
import { TypeAnimation } from 'react-type-animation';



function home() {
  // Get current URL location

  // State variables for mobile view and hamburger menu
 
  return (
      <div className="home flex justify-center">
      <h2 className="absolute text-6xl font-bold text-[#7b9a6d] z-20 top-20"> Invest 
        <TypeAnimation className="text-white" sequence={[
          ' Small',2000,
          ' Smart',2000,
          ' Safe',2000,
        ]} speed={50} repeat={Infinity}/>
   
      </h2>
      <div className="absolute text-slate-300 z-20 flex flex-row text-2xl top-20">
      <button className="homeBtn mr-10">Learn </button>
      <a href="/ratesandcalc"><button className="homeBtn">Start</button></a>
      </div>
      





    </div>
  );
}

export default home;