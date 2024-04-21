import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/home.css";
import "../Home.css";

import { TypeAnimation } from "react-type-animation";
import bg from "../Images/bg.png";

function home() {
  // Get current URL location

  return (
    <div className="home flex justify-center">
      <div>
        <div className=" grid grid-cols-4 bg-container">
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
        </div>
        <div className=" grid grid-cols-4 bg-container2">
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
          <img src={bg} alt="bg" className="bg-container" />
        </div>
      </div>

      <div className="flex"> </div>

      <h2 className="absolute text-6xl font-bold text-[#7b9a6d] z-20 top-20">
        {" "}
        Invest
        <TypeAnimation
          className="text-white"
          sequence={[" Small", 2000, " Smart", 2000, " Safe", 2000]}
          speed={50}
          repeat={Infinity}
        />
      </h2>
      <div className="absolute text-slate-300 z-20 flex flex-row text-2xl top-20">
        <a href="/about">
          <button className="homeBtn mr-10">About</button>
        </a>

        <a href="/ratesandcalc">
          <button className="homeBtn">Start</button>
        </a>
      </div>

      <div className="glass"></div>
    </div>
  );
}

export default home;
