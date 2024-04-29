import { React, useState, useEffect } from "react";
import logo from "../assets/logo.png";

import newlogo from "../assets/newlogo.svg";
const Navbar = ({ setwalletadd }) => {
  const [Status, setStatus] = useState(false);

  const connect = async () => {
    const { solana } = window;
    try {
      let resp = await solana.connect();
      console.log(
        "Connected to Phantom  Wallet Address :" + resp.publicKey.toString()
      );
      setwalletadd(resp.publicKey.toString());
      setStatus(true);
    } catch (error) {
      console.error("Error connecting to Solana:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between bg-black items-center px-20 py-4 text-white border-b-white-200 ">
        <div>
          <img src={newlogo} alt="" width="150px" className="py-3" />
        </div>
        <ul className="flex justify-evenly items-center py-3">
          <li className="px-3 font-sans font-light hover:scale-105 text-left">
            Learn
          </li>
          <li className="px-3 font-sans font-light hover:scale-105 text-left">
            Developers
          </li>
          <li className="px-3 font-sans font-light hover:scale-105 text-left">
            Solutions
          </li>
          <li className="px-3 font-sans font-light hover:scale-105 text-left">
            Network
          </li>
          <li className="px-3 font-sans font-light hover:scale-105 text-left">
            Communtiy
          </li>
          <button
            onClick={connect}
            className=" bg-white align-middle border-1px px-5 py-1 rounded-md mx-10 hover:scale-105 font-medium text-black float-end"
          >
            {Status ? "Connected" : "Connect Wallet"}
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
