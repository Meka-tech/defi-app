import React, { useState } from "react";
import BankPng from "../bank.png";

const Navbar = ({ acoount }) => {
  return (
    <nav
      className="navbar navbar-dark fixed-top  shadow p-0"
      style={{ backgroundColor: "black", height: "50px" }}
    >
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        style={{ color: "white" }}
      >
        <img
          src={BankPng}
          alt="Bank"
          width={"30"}
          className="d-inline-block align-top"
          style={{ marginRight: "5px", marginLeft: "5px" }}
        />
        DAPP Yield Staking (Decentralized Banking)
      </a>
      <ul className="navbar-nav px-3">
        <li className="text-nowrap d-none nav-item  d-sm-block">
          <small style={{ color: "white" }}>ACCOUNT NUMBER: {acoount}</small>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
