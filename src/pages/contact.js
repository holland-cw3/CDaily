import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

import "../CSS/contact.css";

function contact() {
  // Get current URL location

  // State variables for mobile view and hamburger menu
 
  return (
    <div className="contactme mt-20">
        <form action="https://formspree.io/f/mnqelvlk" method="POST">
            <div className="text-white md:text-4xl sm:text-xl mb-10 mt-20">
              Have a <TypeAnimation sequence={[
                'Question?',2000,
                'Bug?',2000,
                'Concern?',2000,
              ]} className="text-[#7b9a6d]"
              speed={20} repeat={Infinity}/>
            </div>
          <input type="text" name="first" placeholder="  First Name" autocomplete='off' required />
          <p className="mt-8"></p>
          <input type="text" name="last" placeholder="  Last Name" autocomplete='off' required/>
          <p className="mt-8"></p>
          <input type="email" name="email" placeholder="  Email Address" autocomplete='off' required/>
          <p className="mt-8"></p>
          <textarea rows="5" cols="60" name="message" placeholder="  Enter text" autocomplete='off' required/>
          <p className="mt-8"></p>
          <button type="submit" className="submitbtn mt-8">Send</button>
        </form>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5877950634442895"
     crossorigin="anonymous"></script>
      </div>
  );
}

export default contact;