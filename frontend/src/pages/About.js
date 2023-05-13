import React from "react";

const About = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <ul className="about-list">
        <li>This MERN project shows all CRUD actions.</li>
        <li>Developer: Azad Alkurdi &copy; {year}</li>
      </ul>
    </>
  );
};

export default About;
