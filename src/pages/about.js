import React from 'react';
import './about.css';
const About = () => {
  return (
    <div className="box">
      <div className="about">
        <div className="header"> {"About the creator:"} </div>
        <br />
        {"Hello, my name is Stanley and I am an avid Tetris player." +
          " I started playing Tetris nearly 4 years ago on" +
          " Tetris Friends before switching to Jstris and Tetrio." +
          " I have a sub 17 20L sprint and sub 36 40L sprint." +
          " This is a project I created to teach Tetris to my friends and practice React JS."}

      </div>
      <div className="contact">
        <div className="header"> {"Contacts:"} </div>
        <ul> <li>
          {"Send inquiries to "}
          <a className={"hyperlink"} href={"mailto:dysmmfz1@gmail.com"} target={"_blank"} >
            {"dysmmfz1@gmail.com"}
          </a>
        </li>
          <li>
            {"Jstris account: "}
            <a className={"hyperlink"} href={"https://jstris.jezevec10.com/u/Dysmmfz1"} target={"_blank"} >
              {"https://jstris.jezevec10.com/u/Dysmmfz1"} </a>
          </li>
          <li>
            {"Tetrio account: "}
            <a className={"hyperlink"} href={"https://ch.tetr.io/u/fruitblast"} target={"_blank"} >
              {"https://ch.tetr.io/u/fruitblast"} </a>
          </li>
        </ul>
      </div>
    </div>

  );
};

export default About;
