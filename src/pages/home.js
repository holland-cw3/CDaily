import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/home.css";
import "../Home.css";


import { TypeAnimation } from 'react-type-animation';
import bg from '../Images/bg.png'



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
      

    

      <section className=" z-22 flex flex-col items-center md:flex-row justify-center textContainer2 w-full">
        <div className="mb-10 w-full bg-white bg-opacity-50 flex flex-col md:flex-row mr-(-5)">
          <div className="align-left md:w-1/2">
          <iframe width="560" className="mt-10 mb-10 ml-10 rounded-md" height="315" src="https://www.youtube.com/embed/_3cgMofw-rc?si=nj3VWG0hjsQHluDR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="flex flex-col md:w-1/2 mr-20 mt-10">
            <h1 className="text-black font-bold text-4xl mb-10 ">
              What Is CDaily?
            </h1>
            <p className="text-black mb-6 mt-5">
              Please sign up to join us Mon-Fri at the{" "}
              <a
                href="https://www.google.com/maps/place/PP1,+College+Park,+MD+20740/@38.9933786,-76.9425631,148m/data=!3m2!1e3!4b1!4m2!3m1!1s0x89b7c69f4dc17645:0xd2d09f5ca7e6b0d9"
                className="text-blue-700 font-bold"
              >
                School of Public Health (SPH)
              </a>{" "}
              East Side (closest to Xfinity Center) starting{" "}
              <b>September 5th. Practices now start at 5pm! </b>
            </p>
            <p className="text-black mb-7">
              Our mission is to support and encourage a healthy approach to
              running and training for all members of the University of
              Maryland. We provide an atmosphere in which runners of all
              abilities can meet each other, share running knowledge and simply
              enjoy running together as well as compete against other club
              college teams.
            </p>
            
          </div>
        </div>
      </section>
      <div className="glass"></div>


      

      





    </div>
  );
}

export default home;