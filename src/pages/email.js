import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../Images/cdaily2.png"; // Importing image



import "../CSS/signup.css";

function email() {
  // Get current URL location

  // State variables for mobile view and hamburger menu
 
  return (
    <div className="flex justify-center">

    <div className="emailsignup flex justify-center">
        <form action="https://evanmasiello.com/cdaily/signup.php" method="POST">
        <h1 className="text-4xl mb-20 font-bold text-[#7b9a6d]">Sign-Up For Weekly Notifications</h1>
        <div className="flex flex-row">
        <img src={logo} alt="logo" className="mb-7 ml-5 mr-3 logo2" />

          <div className="flex flex-col justify-center">
            <p className="text-xl">Too busy to check rates every day? No Worries! <br></br>Sign-Up for our weekly notifications to stay informed on 
              the latest rates
            </p>
            <input type="email" className="text-center text-white mt-10" name="email" placeholder="Email Address" autocomplete='off' required/>
            <p className="mt-8"></p>
          </div>
          
        </div>
  
          <button type="submit" className="submitbtn mt-8">Confirm</button>
        </form>
    
      </div>
     </div>
  );
}

export default email;