import React from "react";
import "../CSS/About.css"; // Importing CSS styles

import team from "../Images/stage.jpg";


function About() {
  return (
    <div className="about-us-container">
      {" "}
      <div className="bio-card">
        {" "}
        <div className="flex flex-row">
          {" "}
          <iframe width="504" height="283" className="mt-10 ml-10 mb-10 video" src="https://www.youtube.com/embed/_3cgMofw-rc?si=uRLgcfzrt-P95Qi-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="flex flex-col md:w-3/4 ml-10 ">
          {" "}
          <h1 className="text-[#7b9a6d] font-bold underline text-2xl mb-10 justify">What is a CD?</h1>{" "}
          <p className="text-white mb-6 text-lg">
            {" "}
            CDs, or Certificates of Deposit, are a type of financial product typically offered by banks
            and credit unions. They are considered a safe investment option for beginners because they
            provide a guaranteed rate of return over a fixed period.

          </p>
        </div>
      </div>

      <div className="bio-card ">
        <div className="align-right md:w-1/2 md:order-2 ">
          <img src={team} alt="team" className="ima mt-10 mb-10"/>
        </div>
        <div className="flex flex-col md:w-1/2 ml-10 mr-20">
          <h1 className="text-[#7b9a6d] font-bold underline text-2xl mb-10 mt-10">What is CDaily?</h1>
          <p className="text-white mb-10 text-lg">
            CDaily is a webscraping service that strives to help people with less capital make smarter investments.
            With an online calculator and a list of Banks with their rates you are able to have a simple
            and stress-free experience looking for CDs to invest in. We’ve done the research and
            compiled a plethora of rates in one place, now all you have to do is decide what works best
            for you. If there are any further questions please visit our email page and shoot us an email!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About; 