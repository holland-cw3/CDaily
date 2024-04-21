import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../Images/cdaily.png"; // Importing image

//import "../CSS/Header.css";

function extension() {
  // Get current URL location

  // State variables for mobile view and hamburger menu

  return (
    <div className="about-us-container">
      {" "}
      <div className="bio-card">
        {" "}
        <div className="flex flex-row">
          {" "}
          <iframe
            width="504"
            height="283"
            className="mt-10 ml-10 mb-10 video"
            src="https://www.youtube.com/embed/_3cgMofw-rc?si=uRLgcfzrt-P95Qi-"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="flex flex-col md:w-3/4 ml-10 ">
          {" "}
          <h1 className="text-[#7b9a6d] font-bold underline text-2xl mb-10 justify">
            How To Install Our Extension
          </h1>{" "}
          <p className="text-white mb-6 text-lg">
            {" "}
            The CDaily Extension will be soon be available on the Chrome Web
            Store.
            <br></br>
            For now you can install it using a local instillation method!
          </p>
        </div>
      </div>
    </div>
  );
}

export default extension;
