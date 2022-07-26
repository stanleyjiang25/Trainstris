import React from "react";
import { Nav, NavMenu, Bars } from "./NavbarElements";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  if (useLocation().pathname === '/') {
    return null;
  }
  else {
    return (
      <>

        <Nav>
          <div className="dropdown">
            <button className="dropbtn">
              <Bars></Bars>
              <div className="dropdown-content">
                <NavLink to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "white",
                    display: 'flex',
                    textAlign: 'center',
                    height: '18.5',
                    cursor: 'pointer',
                    marginLeft: '35px',
                    marginTop: '5px',
                  })}>
                  Home
                </NavLink>
                <NavLink to={"/game"}
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "white",
                    display: 'flex',
                    textAlign: 'center',
                    height: '18.5',
                    cursor: 'pointer',
                    marginLeft: '35px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  })}
                >
                  Game
                </NavLink>
                <NavLink to={"/about"}
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "white",
                    display: 'flex',
                    textAlign: 'center',
                    height: '18.5',
                    cursor: 'pointer',
                    marginLeft: '35px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  })}
                >
                  About
                </NavLink>
              </div>
            </button>
          </div>
        </Nav>



      </>
    );
  }
};

export default Navbar;
